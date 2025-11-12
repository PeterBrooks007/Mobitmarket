import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { XCircle } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { upgradeAccount } from "../redux/features/auth/authSlice";

const accounts = [
  {
    title: "BRONZE ACCOUNT",
    deposit: "Minimum Deposit $1,000",
    features: [
      "Spreads from 3.3 pips",
      "Leverage 1:500",
      "Live Chart Support",
      "All Available Platforms",
    ],
    headerBg: "#795548", // Customize header background color
    grid: { xs: 12, sm: 6, md: 4 },
    buttonText: "OPEN AN ACCOUNT",
    href: "/auth/register",
  },
  {
    title: "SILVER ACCOUNT",
    deposit: "Minimum Deposit $5,000",
    features: [
      "Spreads from 2.2 pips",
      "Leverage 1:700",
      "Live Chart Support",
      "All Available Platforms",
    ],
    headerBg: "#607d8b",
    grid: { xs: 12, sm: 6, md: 4 },
    buttonText: "OPEN AN ACCOUNT",
    href: "/auth/register",
  },
  {
    title: "GOLD ACCOUNT",
    deposit: "Minimum Deposit $15,000",
    features: [
      "Spreads from 1.5 pips",
      "Leverage 1:1000",
      "Live Chart Support",
      "All Available Platforms",
    ],
    headerBg: "#3f51b5",
    grid: { xs: 12, sm: 6, md: 4 },
    buttonText: "OPEN AN ACCOUNT",
    href: "/auth/register",
  },
  {
    title: "DIAMOND ACCOUNT",
    deposit: "Minimum Deposit $30,000",
    features: [
      "Spreads from 1.0 pips",
      "Leverage 1:3000",
      "Live Chart Support",
      "All Available Platforms",
    ],
    headerBg: "#ff5722",
    grid: { xs: 12, sm: 6, md: 6 },
    buttonText: "OPEN AN ACCOUNT",
    href: "/auth/register",
  },
  {
    title: "PEARL ACCOUNT",
    deposit: "Minimum Deposit $50,000",
    features: [
      "Spreads from 0.5 pips",
      "Leverage 1:5000",
      "Live Chart Support",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
    ],
    headerBg: "#9c27b0",
    grid: { xs: 12, sm: 6, md: 6 },
    buttonText: "OPEN AN ACCOUNT",
    href: "/auth/register",
  },
];

export default function PackagePlans({ type }) {
    const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, isSemiLoading } = useSelector((state) => state.auth);

  const [selectedPackage, setSelectedPackge] = useState("BRONZE");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPackage) {
      return toast.error("Please select a package");
    }

    const userData = {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      selectedPackage,
      comment,
    };

    // console.log(userData);

    await dispatch(upgradeAccount(userData));
    await handleClose();
    // await dispatch(getUserWithdrawalhistory());
    // await dispatch(getUser());
    // setFormData(initialState);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Section Heading */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            <strong>
              {" "}
              {type !== "UPGRADE" ? "Trading Accounts" : "Upgrade Account"}
            </strong>
          </Typography>
          <Typography variant="h5" component="h1" gutterBottom>
            <strong>Choose a package</strong>
          </Typography>
        </Box>

        {/* Accounts Grid */}
        <Grid container spacing={4}>
          {accounts.map((account, index) => (
            <Grid
              key={index}
              item
              xs={account.grid.xs}
              sm={account.grid.sm}
              md={account.grid.md}
            >
              <Card
                // You can add custom animations by using libraries like react-reveal or framer-motion.
                // Here we simply use a box shadow and margin.
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ color: "#fff" }}
                    >
                      {account.title}
                    </Typography>
                  }
                  sx={{
                    backgroundColor: account.headerBg,
                    py: 1,
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ fontWeight: "bold", color: "#25d06f", mb: 2 }}
                  >
                    {account.deposit}
                  </Typography>
                  {account.features.map((feature, idx) => (
                    <Box key={idx} display="flex" alignItems="center" mb={1}>
                      {/* <CheckCircle /> */}
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions>
                  <Button
                    component="a"
                    href={type !== "UPGRADE" ? account.href : "#"}
                    fullWidth
                    variant="contained"
                    sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                    onClick={() => {
                      type === "UPGRADE" && handleOpen();
                    }}
                  >
                    {type !== "UPGRADE"
                      ? account.buttonText
                      : "UPGRADE ACCOUNT"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: { xs: "95%", sm: "60%", md: 450 },
            maxHeight: "100%",
            overflow: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "10px",
            p: 2,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mb={1}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="h6">Upgrade Account</Typography>
            <XCircle size={38} onClick={handleClose} />
          </Stack>

          <Divider />

          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <Stack spacing={2}>
                {/* <Stack spacing={0.5}>
                  <InputLabel htmlFor="my-input">Firstname</InputLabel>
                  <Select
                    name="typeOfTransaction"
                    value={formData?.typeOfTransaction}
                    label="Age"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"Sent"}>Sent</MenuItem>
                    <MenuItem value={"Received"}>Received</MenuItem>
                  </Select>
                </Stack> */}
                <Stack spacing={0.5}>
                  <InputLabel htmlFor="my-input">Firstname</InputLabel>
                  <OutlinedInput
                    size="normal"
                    name="walletAddress"
                    placeholder="Enter address "
                    value={user?.firstname}
                    // onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "10px",
                      },
                    }}
                    disabled
                  />
                </Stack>
                <Stack spacing={0.5}>
                  <InputLabel htmlFor="my-input">Lastname</InputLabel>
                  <OutlinedInput
                    name="amount"
                    size="normal"
                    placeholder="Enter amount "
                    value={user?.lastname}
                    // onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "10px",
                      },
                    }}
                    disabled
                  />
                </Stack>
                <Stack spacing={0.5}>
                  <InputLabel htmlFor="my-input">Email</InputLabel>
                  <OutlinedInput
                    name="amount"
                    size="normal"
                    placeholder="Enter amount "
                    value={user?.email}
                    // onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "10px",
                      },
                    }}
                    disabled
                  />
                </Stack>

                <Stack spacing={0.5}>
                  <InputLabel htmlFor="my-input">Select Package</InputLabel>
                  <Select
                    name="status"
                    value={selectedPackage}
                    // label="Age"
                    onChange={(e) => setSelectedPackge(e.target.value)}
                  >
                    <MenuItem value={"BRONZE"}>BRONZE PACKAGE</MenuItem>
                    <MenuItem value={"SILVER"}>SILVER PACKAGE</MenuItem>
                    <MenuItem value={"GOLD"}>GOLD PACKAGE</MenuItem>
                    <MenuItem value={"DIAMOND"}>DIAMOND PACKAGE</MenuItem>
                    <MenuItem value={"PEARL"}>PEARL PACKAGE</MenuItem>
                  </Select>
                </Stack>

                <Stack spacing={0.5}>
                  <InputLabel htmlFor="my-input">Comment</InputLabel>
                  <OutlinedInput
                    name="comment"
                    multiline
                    rows={4}
                    size="normal"
                    placeholder="Enter Comment "
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Stack>
                <Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    // size="small"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      backgroundColor: "#009e4a",
                      color: "white",
                      padding: "10px",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                      },
                    }}
                    disabled={isSemiLoading && true}
                  >
                    {isSemiLoading ? (
                      <CircularProgress size={28} />
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
