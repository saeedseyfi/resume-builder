// to be used in formik field names, to make field names type safe
export const keyCheck = <T extends object, K extends keyof T>(
  reference: T,
  key: K
) => key;
