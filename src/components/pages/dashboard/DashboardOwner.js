import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
export const homeOwner = (
  <Grid container sx={{ m: 5 }}>
    <Typography sx={{ fontSize: 26, fontWeight: 500 }}>
      Wellcome Back Admin
    </Typography>
    <Grid
      justifyContent={"space-around"}
      container
      sx={{
        mt: 3,
        backgroundColor: "#868974",
        borderRadius: 3,
        p: 5,
      }}
    >
      <div>
        <Typography sx={{ color: "#ffff", fontWeight: 300 }}>Member</Typography>
        <Typography
          sx={{
            color: "#ffff",
            fontWeight: 600,
            fontSize: 25,
            margin: "4px 0px",
          }}
        >
          138
        </Typography>
        <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
          total data of all members
        </Typography>
      </div>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ backgroundColor: "#B5B8A6" }}
      />

      <div>
        <Typography sx={{ color: "#ffff", fontWeight: 300 }}>Outlet</Typography>
        <Typography
          sx={{
            color: "#ffff",
            fontWeight: 600,
            fontSize: 25,
            margin: "4px 0px",
          }}
        >
          25
        </Typography>
        <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
          total data of all outlet
        </Typography>
      </div>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ backgroundColor: "#B5B8A6" }}
      />

      <div>
        <Typography sx={{ color: "#ffff", fontWeight: 300 }}>Paket</Typography>
        <Typography
          sx={{
            color: "#ffff",
            fontWeight: 600,
            fontSize: 25,
            margin: "4px 0px",
          }}
        >
          82
        </Typography>
        <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
          total data of all paket
        </Typography>
      </div>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ backgroundColor: "#B5B8A6" }}
      />

      <div>
        <Typography sx={{ color: "#ffff", fontWeight: 300 }}>User</Typography>
        <Typography
          sx={{
            color: "#ffff",
            fontWeight: 600,
            fontSize: 25,
            margin: "4px 0px",
          }}
        >
          626
        </Typography>
        <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
          total data of all user
        </Typography>
      </div>
    </Grid>
  </Grid>
);
