import React, { ChangeEventHandler } from 'react';

type UploadProps = {
  name: string;
  onSelectFile: (file: File) => void;
  multiple?: boolean;
  accept?: string;
};

export const Upload: React.FC<UploadProps> = ({
  onSelectFile,
  accept,
  name,
  multiple = false,
  children,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { currentTarget } = event;
    const file = currentTarget.files?.[0];

    if (!file) {
      return;
    }

    onSelectFile(file);
    currentTarget.value = ''; // to be able to re-upload the same file
  };

  return (
    <>
      <input
        accept={accept}
        id={name}
        multiple={multiple}
        style={{ display: 'none' }}
        type="file"
        onChange={handleChange}
      />
      <label htmlFor={name} style={{ display: 'block' }}>
        {children}
      </label>
    </>
  );
};
