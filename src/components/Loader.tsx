import { Backdrop, Stack, Typography } from "@mui/material";

export function Loader() {
  return (
    <Backdrop
      open={true}
      sx={{
        backgroundColor: `rgb(255 255 255 / ${95}%)`,
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Stack direction="column" spacing={1} alignItems="center">
        <img
          src="https://cdn.pixabay.com/animation/2022/08/21/20/03/20-03-41-348_512.gif"
          alt="Loading Icon"
          width={128}
          height={88}
        />

        <Typography variant="h6">Loading...</Typography>
        {/* <Typography className="heading-xl">loading body</Typography> */}
      </Stack>
    </Backdrop>
  );
}
