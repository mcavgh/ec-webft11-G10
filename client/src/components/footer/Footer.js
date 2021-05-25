import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { red } from '@material-ui/core/colors';

export default function Footer() {
    return (
        <footer>
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{ xs: 5, sm: 10 }}
                bgcolor={red[800]}
                color='white'
            >
                <Container maxWidth='lg'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} fontWeight='fontWeightBold'>
                                Ayuda
                            </Box>
                            <Box>
                                <Link href='/' color='inherit'>
                                    Contacto
                                </Link>
                            </Box>
                            <Box>
                                <Link href='/' color='inherit'>
                                    Acerca de nosotros
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} fontWeight='fontWeightBold'>
                                Cuenta
                            </Box>
                            <Box>
                                <Link
                                    href='https://ec-webft11-g10.vercel.app/login'
                                    color='inherit'
                                >
                                    Iniciar sesión
                                </Link>
                            </Box>
                            <Box>
                                <Link
                                    href='https://ec-webft11-g10.vercel.app/signup'
                                    color='inherit'
                                >
                                    Registrarse
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} fontWeight='fontWeightBold'>
                                Eatx' Space
                            </Box>
                            <Box>
                                <Link href='/' color='inherit'>
                                    Productos Eatx
                                </Link>
                            </Box>
                            <Box>
                                <Link href='/' color='inherit'>
                                    Merchandising
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        textAlign='center'
                        pt={{ xs: 5, sm: 10 }}
                        pb={{ xs: 5, sm: 0 }}
                    >
                        Grupo 10 Henry E-Commerce &reg;
                        {new Date().getFullYear()}
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}
