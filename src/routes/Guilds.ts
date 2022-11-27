import { Request, Response, Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn";
import User from "../models/User";
import Channel from "../models/Channel";
import Guild from "../models/Guild";
import { body, validationResult } from "express-validator";
import config from "../../config";
import { IUser } from "../typings/IUser";
import { IChannel } from "../typings/IChannel";
import belongToGuild from "../middlewares/belongToGuild";
const router = Router();

router.get("/@me", isLoggedIn, async (req: Request, res: Response) => {
  const user = await User.findById((req.user as any)._id)
    .populate("guilds")
    .populate("channel");
  res.json((user as unknown as IUser).guilds);
});

router.post(
  "/",
  body("name").isLength({ min: 2, max: 32 }).withMessage("Invalid name"),
  isLoggedIn,
  async (req: Request, res: Response) => {
    const user = await User.findById(
      (req.user as unknown as IUser)._id
    ).populate("guilds");
    if (
      (user as unknown as IUser).guilds?.length >=
      config.NORMAL_USER_GUILD_LIMIT
    ) {
      return res.status(403).json({ error: "Forbidden." });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const guild = await Guild.create({
      name: req.body.name,
      features: [],
      owner: (req.user as unknown as IUser)._id,
      channels: [],
      icon: req.body.icon || "default",
    });

    const defaultChannel = (await Channel.create({
      name: "general",
      type: "GUILD_TEXT",
      guild: guild._id,
    })) as unknown as IChannel;

    await Guild.findOneAndUpdate(guild._id, {
      $push: { channels: defaultChannel._id },
    });

    await User.findOneAndUpdate((req.user as unknown as IUser)._id as any, {
      $push: {
        guilds: guild._id,
      },
    });

    const returnGuild = await Guild.findById(guild._id, {
      versionKey: false,
    }).populate("channels");

    return res.json(returnGuild?.toJSON());
  }
);

router.get(
  "/:guildID/channels",
  isLoggedIn,
  belongToGuild,
  async (req: Request, res: Response) => {
    const guild = await Guild.findById(req.params.guildID).populate("channels");
    if (!guild) return res.status(404).json({ error: "Not found." });
    return res.json((guild as any).channels);
  }
);

router.post(
  "/:guildID/channels",
  isLoggedIn,
  belongToGuild,
  body("name")
    .isLength({ min: 1, max: 15 }).withMessage('Channel name should be between 1 and 15 characters')
    .notEmpty()
    .withMessage("Failed to create channel"),
  async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const guild = await Guild.findOne({_id: req.params.guildID});
    if(!guild) return res.status(404).json({ errors: ['Guild does not exsist.']});
    if(!req.body.type || req.body.type !== 'GUILD_TEXT' && req.body.type !== 'GUILD_ANNOUNCEMENT' && req.body.type !== 'GUILD_CATEGORY') return res.status(404).json({ errors: ['Guild channel type is not valid.']});

    let channel = await Channel.create({
      name: req.body.name,
      type: req.body.type,
      guild: req.params.guildID,
      description: req.body.description || null,
    })

   await Guild.findOneAndUpdate({_id: req.params.guildID}, {$push: {channels: channel._id}})

    await res.json(channel.toJSON())

  }
);

router.delete("/:guildID/", async (req: Request, res: Response) => {
  //TODO: Deleting guild
});

export default router;
