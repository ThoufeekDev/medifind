import { Worker } from "bullmq";

import {redis} from "../config/redis";
import { sendOtpEmail } from "../services/email.service";

export const otpWorker = new Worker(

  "otp-email-queue",

  async (job) => {

    try {

      await sendOtpEmail(
        job.data.email,
        job.data.otp
      );

      console.log(
        "OTP email sent"
      );

    } catch(error){

      console.log(error);

    }
  },

  {
    connection: redis
  }
);