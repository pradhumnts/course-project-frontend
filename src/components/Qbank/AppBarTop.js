import React from "react";

const AppBarTop = ({ open, state, finishTestHandler, timeSpent }) => {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

  return (
    <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            STEP2 CK QBank{" "}
            {isDesktop && (
              <sup>{capitalizeFirstLetter(state.courseMode)} Mode</sup>
            )}{" "}
          </Typography>
        </Box>
        {isDesktop && (
          <Box>
            {!testComplete ? (
              <Box sx={{ display: "flex", alignItems: "center", columnGap: 3 }}>
                {counter < 3600 ? (
                  <Typography variant="p" noWrap component="div">
                    Block Time Remaining:{" "}
                    {new Date(counter * 1000).toISOString().substr(14, 8)}{" "}
                  </Typography>
                ) : (
                  <Typography variant="p" noWrap component="div">
                    Block Time Remaining:{" "}
                    {new Date(counter * 1000).toISOString().substr(11, 8)}{" "}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  size="medium"
                  onClick={finshTestHandler}
                >
                  Finish Test
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", columnGap: 3 }}>
                {timeSpent < 3600 ? (
                  <Typography variant="p" noWrap component="div">
                    Total Time Spent: {timeSpent}{" "}
                  </Typography>
                ) : (
                  <Typography variant="p" noWrap component="div">
                    Total Time Spent: {timeSpent}{" "}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  size="medium"
                  onClick={finshTestHandler}
                >
                  See Results
                </Button>
              </Box>
            )}
          </Box>
        )}
        {!testComplete ? (
          <Button variant="contained" size="medium" onClick={finshTestHandler}>
            Finish Test
          </Button>
        ) : (
          <Button variant="contained" size="medium" onClick={finshTestHandler}>
            See Results
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarTop;
