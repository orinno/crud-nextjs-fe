import React, { useRef, useEffect } from 'react';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { IconTrash, IconFileTypePdf, IconFile } from '@tabler/icons-react';
import Image from 'next/image';
import CustomOutlinedInput from '../forms/theme-elements/CustomOutlinedInput';

type DocumentUploadProps = {
  selectedFiles: {
    name: string;
    file: File;
    url: string;
    preview: string;
    fileType: string;
  }[];
  onFileChange: (files: FileList | null) => void;
  onDeleteFile: (index: number) => void;
  accept?: string;
  multiple?: boolean;
  description?: string;
  cameraCapture?: boolean;
  onFileSelect?: (file: File) => void;
};

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  selectedFiles,
  onFileChange,
  onDeleteFile,
  accept,
  multiple = true,
  description = '',
  cameraCapture = false,
  onFileSelect,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [selectedFiles]);

  const handleDeleteFile = (index: number) => {
    onDeleteFile(index);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <CustomOutlinedInput
        id="documents"
        fullWidth
        type="file"
        name="documents"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileChange(e.target.files)}
        inputProps={{
          multiple: multiple,
          accept: accept || 'image/*',
          // This enables camera access on mobile devices while still allowing file selection
          capture: cameraCapture ? 'camera' : undefined,
        }}
        inputRef={inputRef}
      />
      <Typography variant="caption" color="red" mt={1} marginLeft={1}>
        {description}
      </Typography>
      {selectedFiles.length > 0 && (
        <Grid container spacing={2} mt={0}>
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
                  <div
                    style={{
                      width: 100,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* <Image
                      src={file.preview}
                      alt={file.name}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                    /> */}
                    <img
                      src={typeof file.preview === 'string' ? file.preview : file.url}
                      alt={file.name}
                      style={{
                        width: 100,
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                )}
                <Typography variant="body2" align="center">
                  {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                </Typography>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handleDeleteFile(index)}
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

export default DocumentUpload;
