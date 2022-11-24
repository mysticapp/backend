// Used to check if user has ONE of required permissions
export const oneOf = (currentPermissions: string[], permissionsToCheck: string[]) => {
    let result = false;
    currentPermissions.forEach((permission: string) => {
        if(permissionsToCheck.includes(permission)){
            result = true
        }
    });
    return result;
}

// Used to check if user has ALL required permissions
export const allOf = (currentPermissions: string[], permissionsToCheck: string[]) => {
    return permissionsToCheck.every((permission: string) => currentPermissions.includes(permission))
}