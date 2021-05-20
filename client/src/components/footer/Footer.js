import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'


export default function Footer (){
    return <footer>
        <Box px={{xs:3,sm:10}} py={{xs:5,sm:10}} bgcolor="error.main" color="white">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1} fontWeight="fontWeightBold" >Help</Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Contact                            
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Support                            
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Privacy                            
                            </Link>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1} fontWeight="fontWeightBold" >Account</Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Login                            
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Register                            
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1} fontWeight="fontWeightBold">Messages</Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Backup                            
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            History                            
                            </Link>
                        </Box>
                    </Grid>

                </Grid>
                <Box textAlign="center" pt={{xs:5,sm:10}} pb={{xs:5,sm:0}}>
                 Grupo 10 Henry Ecommerce &reg;{new Date().getFullYear()}
                </Box>

            </Container>
        </Box>
        </footer>
}