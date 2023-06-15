import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";
// import CustomButton from "./../components/CustomButton";
import { useStateContext } from "../context";
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("provide valid image url");
        setForm({ ...form, image: "" });
      }
    });

    console.log(form);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 ">
      {isLoading && "loader..."}
      <div>
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white ">
          Start a campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]  "
      >
        <div className="flex flex-wrap gap-[40px]  ">
          <FormField
            labelName="Your Name *"
            placeholder="Yash Nigam"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px] ">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain "
          />
          <h5 className="font-epilogue font-bold text-[16px] text-white ml-[20px]  ">
            You will get 100% of the raised amount
          </h5>
        </div>
        <div className="flex flex-wrap gap-[40px]  ">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="end date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Campaign image *"
          placeholder="Place image Url of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        <div className="flex justify-center items-center mt-[40px] ">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
