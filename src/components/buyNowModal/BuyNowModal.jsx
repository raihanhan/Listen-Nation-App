/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);
  const [cardNumber, name, expiryDate, cvv] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mengirim informasi pembayaran:", {
      name,
      cardNumber,
      expiryDate,
      cvv,
    });
    alert("Pembayaran berhasil!");
    setOpen(false); // Optionally close the modal after submission
  };
  function formatExpires(value) {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^([2-9])$/g, "0$1")
      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
      .replace(/^0{1,}/g, "0")
      .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
  }

  return (
    <>
      <Button
        type="button"
        color="blue"
        onClick={handleOpen}
        className="w-full capitalize"
      >
        Buy Now
      </Button>
      <Dialog open={open} handler={handleOpen} className="bg-blue-50">
        <DialogBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={addressInfo.name}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    name: e.target.value,
                  });
                }}
                placeholder="Enter your name"
                className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="cardNumber"
                value={addressInfo.cardNumber}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    cardNumber: e.target.value,
                  });
                }}
                placeholder="Enter your Card Number"
                className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
              />
            </div>
            <div className="mb-3 flex gap-3">
              <input
                type="text"
                name="cvv"
                value={addressInfo.cvv}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    cvv: e.target.value,
                  });
                }}
                placeholder="Enter your CVV"
                className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
              />
              <input
                type="text"
                name="expiryDate"
                value={formatExpires(addressInfo.expiryDate)}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    expiryDate: e.target.value,
                  });
                }}
                placeholder="Enter your Card Expiry Date"
                className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
              />
            </div>
            <div className="">
              <Button
                type="button"
                onClick={() => {
                  handleOpen();
                  buyNowFunction();
                }}
                color="blue"
                className="w-full capitalize"
              >
                Buy now
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
