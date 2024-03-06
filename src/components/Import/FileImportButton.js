import React, { useEffect } from 'react';
import { Button, Upload, message, App } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const FileImportButton = () => {
    const checkFileType = (file) => {
        const allowedTypes = [
            'application/vnd.ms-excel',
        ];
        const isAllowedType =
            allowedTypes.includes(file.type) ||
            file.name.endsWith('.xls') ||
            file.name.endsWith('.xlsx');
        if (!isAllowedType) {
            message.error('You can only upload CSV, Excel, JPG, PNG, or PDF files!');
        }
        return isAllowedType;
    };

    const checkFileSize = (file) => {
        const maxSize = 53 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            message.error('File size must be within 5MB!');
            return false;
        }
        return true;
    };

    const handleFile = async (file) => {
        try {
            if (checkFileType(file) && checkFileSize(file)) {
                // Log file details to the console
                console.log('File details:', {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    lastModified: file.lastModified,
                });
                // await handleImportAreaClick()
                message.success(`${file.name} file details logged successfully`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error logging file details:', error);
            message.error(`Error logging file details for ${file.name}`);
        }
    };

    const props = {
        action: 'https://solar-transit-back-end.onrender.com/file/upload',
        beforeUpload: handleFile,
        showUploadList: true,
    };

    return (
        <Upload {...props}>
            <Button type="default" shape="round" icon={<DownloadOutlined />} size="default">
                Import xls
            </Button>
        </Upload>
    );
};

export default FileImportButton;
