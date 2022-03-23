import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

export default function homeKasir({ count }) {
  return (
    <Grid container sx={{ m: 5 }}>
      <Typography sx={{ fontSize: 26, fontWeight: 500 }}>
        Wellcome Back Kasir
      </Typography>
      <Grid
        justifyContent={"space-around"}
        container
        sx={{
          mt: 3,
          backgroundColor: "primary.main",
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
            {count.member}
          </Typography>
          <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
            total data of all members
          </Typography>
        </div>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "#ffff" }}
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
            {count.outlet}
          </Typography>
          <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
            total data of all outlet
          </Typography>
        </div>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "#ffff" }}
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
            {count.paket}
          </Typography>
          <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
            total data of all paket
          </Typography>
        </div>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "#ffff" }}
        />

        <div>
          <Typography sx={{ color: "#ffff", fontWeight: 300 }}>Transaction</Typography>
          <Typography
            sx={{
              color: "#ffff",
              fontWeight: 600,
              fontSize: 25,
              margin: "4px 0px",
            }}
          >
            {count.transaksi}
          </Typography>
          <Typography sx={{ color: "#ffff", fontSize: 14, fontWeight: 300 }}>
            total data of all transaction
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}