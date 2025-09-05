"use client";

import React from "react";
import Livehero from "../components/liveHero";
import LiveFeature from "../components/liveFeatures"
import LiveClass from "../components/liveclass";
import Stats from "@/app/components/home/stats-facts";
import Sessions from "../components/sessions";



export function Liveclass() {
  return (
    <>
      <Livehero channelUrl="https://www.youtube.com/@CreditorAcademy" />
      <LiveFeature />
      <LiveClass />
      <Stats />
      <Sessions />
    </>
  );
}
