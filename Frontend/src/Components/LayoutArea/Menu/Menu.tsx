import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

const pages = ["Home", "Vacations"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const currentUser = useSelector((appState: AppState) => appState?.user);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const isAdmin = currentUser?.roleId === 1;
  const updatedPages = isAdmin
    ? [...pages, { name: "Add", link: "/vacations/new" }, "Reports"]
    : pages;

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#333",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.50)",
          transition: "transform 0.3s, border 0.3s",
      
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                letterSpacing: ".3rem",
                color: "#fff",
                flexGrow: 1,
                textAlign: "left",
              }}
            >
              Vacations
            </Typography>

            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {updatedPages.map((page) => (
                  <MenuItem
                    key={typeof page === "string" ? page : page.link}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(
                        typeof page === "string"
                          ? `/${page.toLowerCase()}`
                          : page.link
                      );
                    }}
                  >
                    {typeof page === "string" ? page : page.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {updatedPages.map((page) => (
                <Button
                  key={typeof page === "string" ? page : page.link}
                  onClick={() =>
                    navigate(
                      typeof page === "string"
                        ? `/${page.toLowerCase()}`
                        : page.link
                    )
                  }
                  sx={{
                    mx: 2,
                    color: "#fff",
                    textTransform: "capitalize",
                    fontWeight: 500,
                  }}
                >
                  {typeof page === "string" ? page : page.name}
                </Button>
              ))}
            </Box>
            <AuthMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
