import React, { useEffect } from 'react';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { IconTrash, IconFileTypePdf, IconFile } from '@tabler/icons-react';
import Image from 'next/image';
import CustomOutlinedInput from '../forms/theme-elements/CustomOutlinedInput';
import { Controller, useFormContext } from 'react-hook-form';
import { getFileExtension } from '@/utils/common-helper';

type DocumentUploadFormProps = {
  accept?: string;
  multiple?: boolean;
  name: string;
  required?: boolean;
  description?: string;
};

type SelectedFile = {
  name: string;
  file: File;
  url: string;
  preview: string;
  fileType: string;
};

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  accept,
  multiple = true,
  name,
  required = false,
  description,
}) => {
  const methods = useFormContext();
  const files = methods.watch(name);
  const [selectedFiles, setSelectedFiles] = React.useState<SelectedFile[]>([]);
  const [isRequired, setIsRequired] = React.useState<boolean>(required);
  useEffect(() => {
    if (typeof files === 'object') {
      const newFiles = Array.from(files).map((file: any) => {
        return {
          name: file.name,
          file: file,
          url: createBlobUrlFromFile(file),
          preview: createBlobUrlFromFile(file),
          fileType: file.type.split('/')[1],
        };
      });
      setSelectedFiles(() => newFiles);
      setIsRequired(() => false);
    } else if (typeof files === 'string') {
      setSelectedFiles([
        {
          name: files,
          file: new File([], files),
          url: files,
          preview: files,
          fileType: getFileExtension(files),
        },
      ]);
      setIsRequired(() => false);
    } else {
      setSelectedFiles(() => []);
      setIsRequired(() => required);
    }
  }, [files, required]);

  const onDeleteFile = (index: number) => {
    const newFiles = selectedFiles.filter((_: any, i: any) => i !== index);
    methods.setValue(name, newFiles);
  };

  const createBlobUrlFromFile = (file: File) => {
    return URL.createObjectURL(file);
  };
  return (
    <div>
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => {
          // field value is FileList create a string filename from it
          return (
            <CustomOutlinedInput
              {...field}
              id="documents"
              fullWidth
              type="file"
              name="documents"
              value={field.value?.fileName}
              required={isRequired}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.files)}
              inputProps={{
                multiple: multiple,
                accept: accept || 'image/*',
                capture: 'user',
              }}
            />
          );
        }}
      />
      <Typography variant="caption" color="red" mt={2} marginLeft={2}>
        {description}
      </Typography>
      {selectedFiles.length > 0 && (
        <Grid container spacing={2} mt={1}>
          {selectedFiles.map((file, index) => (
            <Grid item key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {file.fileType === 'pdf' ? (
                  <IconFileTypePdf
                    size={30}
                    color="#FF0000"
                    stroke={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <img
                    src={typeof file.preview === 'string' ? file.preview : file.url}
                    alt={file.name}
                    style={{
                      width: 100,
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  // <Image src={file.preview} alt={file.name} width={50} height={50} />
                )}
                <Typography variant="body2" align="center">
                  {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                </Typography>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => onDeleteFile(index)}
                    size="small"
                    style={{ marginTop: '8px', color: 'red' }}
                  >
                    <IconTrash />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DocumentUploadForm;
