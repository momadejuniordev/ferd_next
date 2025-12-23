import React from "react";
import AboutSectionDashboard from "@/app/dashboard/home/about/page";
import HeroSection from "@/app/dashboard/home/hero/page";
import ServicesDashboard from "@/app/dashboard/home/services/page";


export default function(){
    return(
        <>
            <h3>Pagina Inicial</h3>
            <HeroSection />
            <AboutSectionDashboard />
            <ServicesDashboard />


        </>
    )
}