import * as Yup from 'yup';

const SUPPORTED_FILE_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const getMimeTypeFromBase64 = (base64String) => {
    const mimeTypeMatch = base64String.match(/^data:(image\/[a-zA-Z]+);base64,/);
    return mimeTypeMatch ? mimeTypeMatch[1] : null;
};

const getFileSizeInBytes = (base64String) => {
    const padding = (base64String.match(/=/g) || []).length;
    const base64Length = base64String.length - (base64String.indexOf(',') + 1); // Exclude the data prefix
    return (base64Length * 3) / 4 - padding;
};

export const sightingValidationSchema = Yup.object().shape({
    photo: Yup.mixed()
        .required('Photo is required')
        .test(
            'fileType',
            'Unsupported File Format',
            (value) => {
                if (!value) return false;
                const mimeType = getMimeTypeFromBase64(value);
                return SUPPORTED_FILE_FORMATS.includes(mimeType);
            }
        )
        .test('fileSize', 'File size exceeds 10 MB', (value) => {
            if (!value) return false;
            const fileSize = getFileSizeInBytes(value);
            return fileSize <= MAX_FILE_SIZE;
        }),
    status: Yup.string().required('Status is required'),
    mortalityType: Yup.string()
        .nullable()
        .when('status', {
            is: 'Dead',
            then: () => Yup.string().required('Mortality type is required'),
            otherwise: () => Yup.string().notRequired(),
        }),
    customMortalityType: Yup.string()
        .when('mortalityType', {
            is: 'Other',
            then: () => Yup.string().required('Custom Mortality Type is required'),
            otherwise: () => Yup.string().notRequired(),
        }),
    location: Yup.object().shape({
        latitude: Yup.number()
            .typeError('Latitude must be a number')
            .min(-90, 'Latitude must be between -90 and 90')
            .max(90, 'Latitude must be between -90 and 90')
            .when('locationError', {
                is: true,
                then: () => Yup.number().required('Latitude is required'),
                otherwise: () => Yup.number().notRequired(),
            }),
        longitude: Yup.number()
            .typeError('Longitude must be a number')
            .min(-180, 'Longitude must be between -180 and 180')
            .max(180, 'Longitude must be between -180 and 180')
            .when('locationError', {
                is: true,
                then: () => Yup.number().required('Longitude is required'),
                otherwise: () => Yup.number().notRequired(),
            }),
    }),
    additionalNotes: Yup.string()
        .max(500, 'Additional notes must be 500 characters or less')
        .trim(),
});
