export function generateCustId(role: string): string {
    const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `${role.toUpperCase()}-${randomStr}`;
}
