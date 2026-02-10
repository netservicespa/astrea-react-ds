import React, { useState } from 'react';
import {
    Box,
    Button as NsButton,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NsTextInput } from '../../components/form/fields/NsTextInput';
import { required } from '../../components/form/validators';
import { useTranslation } from 'react-i18next';
import { NsForm } from '../../components/form/NsForm';
import { NsHeader } from '../../patterns/navigation/NsHeader';

export interface NsLoginProps {
    onButtonClick: () => void;
    logoSrc?: string;
    gradient?: string;
    imagePath?: string;
    headerLogo?: React.ReactElement;
    title1?: string;
    title2?: string;
    headerTitle?: {
        bold: string;
        thin: string;
        subtitle: string;
    };
    cardBorderRadius?: string;
    description?: string;
    buttonsSlot?: React.ReactNode | boolean;
    loginButtonText?: string;
    type?: 'link' | 'form' | 'classic';
    handleFormSubmit: any;
    formBgColor?: string;
    rightBannerColor?: string;
    cardWidth?: string;
}

export const NsLogin: React.FC<NsLoginProps> = ({
    onButtonClick,
    logoSrc = './images/logo-dark.png',
    gradient = 'linear-gradient(-233.26983238966562deg, rgba(48, 138, 125, 0.99) 1.4305340335588706e-14%, #0c4b50 99.99999999999999%)',
    imagePath = './images/ns-abstarct.jpg',
    headerLogo,
    title1 = 'Login',
    title2 = 'Login 2',
    headerTitle,
    cardBorderRadius,
    description = '',
    buttonsSlot = true,
    loginButtonText,
    type = 'classic',
    handleFormSubmit,
    formBgColor = '#fff',
    rightBannerColor = '#fff',
    cardWidth = '500px',
}) => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [logoSrc, setLogoSrc] = useState('./images/logo-dark.png'); // Initialize with the default logoSrc value
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPassword ? 'text' : 'password';
    const [data, setData] = React.useState<any>(null);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            style={{
                backgroundImage: `${gradient}, url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
            }}
        >
            <Grid container sx={{ minHeight: { xs: 'auto', sm: '100vh' }, alignItems: { sm: 'stretch' } }}>
                {type !== 'classic' && (
                    <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Box
                            sx={{
                                backgroundColor: rightBannerColor,
                                minHeight: { xs: 'auto', sm: '100vh' },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: { xs: 3, sm: 0 },
                                px: { xs: 2, sm: 0 },
                            }}
                        >
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={logoSrc}
                                    sx={{
                                        height: { xs: 140, sm: 220 },
                                        maxWidth: { xs: 180, sm: 220 },
                                        objectFit: 'contain',
                                        backgroundColor: rightBannerColor,
                                    }}
                                />
                            </Card>
                            <Typography
                                variant="h1"
                                align="center"
                                sx={{ fontSize: { xs: '1.8rem', sm: '2.8rem' }, lineHeight: 1.2, mt: 2 }}
                            >
                                {title1}
                                {title2 && (
                                    <>
                                        <br />
                                        {title2}
                                    </>
                                )}
                            </Typography>
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12} sm={type !== 'classic' ? 8 : 12}>
                    <Box
                        sx={{
                            minHeight: { xs: 'auto', sm: '100vh' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            py: { xs: 3, sm: 0 },
                            px: { xs: 2, sm: 0 },
                        }}
                    >
                        {type !== 'classic' && (
                            <Box
                                sx={{
                                    display: { xs: 'flex', sm: 'none' },
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    mb: 3,
                                    width: '100%',
                                }}
                            >
                                <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
                                    <CardMedia
                                        component="img"
                                        image={logoSrc}
                                        sx={{
                                            height: 80,
                                            maxWidth: 180,
                                            objectFit: 'contain',
                                            backgroundColor: 'transparent',
                                            mx: 'auto',
                                        }}
                                    />
                                </Card>
                                <Typography
                                    variant="h6"
                                    align="center"
                                    sx={{ fontSize: '1.4rem', lineHeight: 1.2, mt: 1 }}
                                >
                                    {title1}
                                    {title2 && (
                                        <>
                                            <br />
                                            {title2}
                                        </>
                                    )}
                                </Typography>
                            </Box>
                        )}
                        <Card
                            sx={{
                                backgroundColor: formBgColor,
                                width: '100%',
                                maxWidth: cardWidth,
                                borderRadius: cardBorderRadius,
                                boxSizing: 'border-box',
                            }}
                        >
                            <CardContent sx={{ padding: { xs: '20px', sm: '30px' } }}>
                                <CardHeader
                                    title="Login"
                                    sx={{
                                        '.MuiCardHeader-title': {
                                            fontSize: 'xx-large',
                                            fontWeight: 'bold',
                                            textAlign: type === 'link' ? 'center' : 'left',
                                        },
                                        padding: '0 0 16px 0',
                                    }}
                                />
                                {description && (
                                    <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                                        {description}
                                    </Typography>
                                )}
                                {type === 'link' ? (
                                    <Box sx={{ mt: 4 }}>
                                        <NsButton onClick={onButtonClick} style={{ width: '100%' }} variant="contained">
                                            {loginButtonText}
                                        </NsButton>
                                    </Box>
                                ) : (
                                    <NsForm buttonsSlot={buttonsSlot} onSubmit={handleFormSubmit}>
                                        <Box sx={{ mb: 2 }}>
                                            <NsTextInput
                                                name="username"
                                                label="Username*"
                                                validate={required}
                                                errorMessage={t('form.errors.required', {
                                                    field: 'Username',
                                                })}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            <NsTextInput
                                                name="password"
                                                label="Password*"
                                                validate={required}
                                                errorMessage={t('form.errors.required', {
                                                    field: 'Password',
                                                })}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type={inputType}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Box>
                                    </NsForm>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};
