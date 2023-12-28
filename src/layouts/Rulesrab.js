import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import RabSidebar from './RabSidebar'

const Rulesrab = () => {
    const rules = [
        {
            header: "Agroforestry Type",
            list:[
                { name: "Check the appropriate agroforestry type"},
                { name: "Alley Cropping"},
                { name: "Silvopasture"},
                { name: "Windbreaks"},
                { name: "Forest Farming"},
            ]
        },
        {
            header: "Check the appropriate agroforestry type",
            list:[
                { name: "Check the appropriate agroforestry type"},
                { name: "Alley Cropping"},
                { name: "Silvopasture"},
                { name: "Windbreaks"},
                { name: "Forest Farming"},
            ]
        },
        {
            header: "Type of Products Intended for Cultivation",
            list:[
                { name: "Fruits"},
                { name: "Nuts"},
                { name: "Timber"},
                { name: "Medicinal Plants"},
              
            ]
        },
        {
            header: "Identify the primary seasonal patterns for agroforestry",
            list:[
                { name: "Rainy Season"},
                { name: "Dry Season"},
                { name: "Both"},
              
            ]
        },
        {
            header: "Type of Farmer",
            list:[
                { name: "Smallholder Farmer"},
                { name: "Commercial Farmer"},
                { name: "Cooperative Member"},
              
            ]
        },
        {
            header: "Geographical Location",
            list:[
                { name: "Latitude: ____________"},
                { name: "Longitude: ___________"},
                { name: "Altitude: ____meters above sea level"},
              
            ]
        },
    ]
  return (
    <div className="flex flex-row gap-4">
    {/***Top Cards***/}
    <aside className="sidebarArea shadow" id="sidebarArea" >
      <div className="fixed">

        <RabSidebar />
      </div>
      </aside>

    {/***Sales & Feed***/}
    <div className="flex flex-col ">
     
     <div className="fixed w-[75%] z-40">

       
         <Header />
     </div>
     <div className='py-20 flex flex-col gap-4'>
     <h1 className='text-[20px] text-center font-bold'>Digital Agroforestry Compliance <br/> Checklist for RAB Approval</h1>
            <span className='text-center px-4 text-black/40'>We are thrilled to present a comprehensive checklist designed to ensure that all farmers meet the requirements
                 for Digital Agroforestry, seeking approval from the Rwanda Agriculture Board (RAB). This checklist encapsulates key parameters essential
                 for evaluating the readiness of farmers in adopting digital technologies for agroforestry practices. Please find below the detailed checklist:
            </span>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {rules.map((item,index)=>{
                return(
                    <div key={index} className='flex flex-col gap-2 bg-gray-100 shadow-md rounded-md p-2'>
                    <h1 className='text-[14px] font-medium'>{item.header}</h1>
                    <div className='flex flex-col gap-1'>
                        {item.list.map((item,index)=>{
                            return(
                            <div key={index} className='flex flex-row gap-2 items-center'>
                                <span className='h-2 w-2 bg-black rounded-full'></span>
                                <span className='text-[12px]'>{item.name}</span>
                            </div>
                            )
                        })}
                      
                      
                        
                        
                       
                    </div>
    
                </div>
                )
            })}
       
        </div>
        
     </div>
     </div>
    </div>
  )
}

export default Rulesrab
