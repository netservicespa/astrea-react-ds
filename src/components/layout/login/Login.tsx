import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ValidatedTextInput } from '../../components/form/fields/ValidatedTextInput';
import { required } from '../../components/form/validators';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from '../../components/form/ValidatedForm';
import { NsButton } from '../../components/NsButton';
import {Header} from "../../patterns/navigation/Header";

interface LoginProps {
  onButtonClick: () => void;
  logoSrc?: string;
  gradient?: string;
  imagePath?: string;
  headerLogo?: React.ReactElement
  title1?: string;
  title2?: string;
  headerTitle?:{
      bold: string,
      thin: string,
      subtitle: string,
  }
  cardBorderRadius?:string;
  description?: string;
  loginButtonText?: string;
  type?: 'link' | 'form' | 'classic';
  handleFormSubmit: any;
}

export const Login: React.FC<LoginProps> = ({
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
  loginButtonText = 'Entra con Keycloak',
  type = 'classic',
  handleFormSubmit,
}) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      }}
    >
      <Grid container>
          {type === 'classic' ?
              //if classic we put the Header
              <Grid item xs={12} sm={12}>
                <Header logo={headerLogo} title={headerTitle} configuration={{centralLogo:true}}/>
              </Grid>
              :
              <>
                <Grid item xs={12} sm={4}>
                  <div
                      style={{
                        backgroundColor: '#fff',
                        height: '100vh',
                        borderTopRightRadius: '35px',
                        borderBottomRightRadius: '35px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                  >
                    <Card>
                      <CardMedia
                          component="img"
                          height="220"
                          image={logoSrc}
                          style={{
                            maxWidth: '220px',
                            objectFit: 'contain',
                            marginBottom: '10px',
                          }}
                      />
                    </Card>
                    <Typography variant="h1" align="center">
                      {title1}
                      {title2 && (
                          <>
                            <br />
                            {title2}
                          </>
                      )}
                    </Typography>
                  </div>
                </Grid>
              </>
          }
        <Grid item xs={12} sm={type !== 'classic' ? 8 : 12}>
          <div
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                width: '500px',
                borderRadius: `${cardBorderRadius}`,
              }}
            >
              <CardContent sx={{ padding: '30px' }}>
                <CardHeader
                  title="Login"
                  sx={{
                    '.MuiCardHeader-title': {
                      fontSize: 'xx-large',
                      fontWeight: 'bold',
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
                    <NsButton onClick={onButtonClick} style={{ width: '100%' }}>
                      {loginButtonText}
                    </NsButton>
                  </Box>
                ) : (
                  <ValidatedForm
                    onSubmit={handleFormSubmit}
                    onReset={() => setData(null)}
                  >
                    <Box sx={{ mb: 2 }}>
                      <ValidatedTextInput
                        name="username"
                        label="Username"
                        validate={required}
                        errorMessage={t('form.errors.required', {
                          field: 'Username',
                        })}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <ValidatedTextInput
                        name="password"
                        label="Password"
                        validate={required}
                        errorMessage={t('form.errors.required', {
                          field: 'Password',
                        })}
                        onChange={(e) => setPassword(e.target.value)}
                        type={inputType}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </ValidatedForm>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
