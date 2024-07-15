import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React from 'react'
import ProgressAnalytics from "./ProgressAnalytics"

const ProgressTabs = () => {
  return (
    <Tabs defaultValue="day" className="w-full">
      <TabsList>
        <TabsTrigger value="day">Today</TabsTrigger>
        <TabsTrigger value="week">This Week</TabsTrigger>
        <TabsTrigger value="month">This Month</TabsTrigger>
        <TabsTrigger value="last-week">Last Week</TabsTrigger>
        <TabsTrigger value="last-month">Last Month</TabsTrigger>
      </TabsList>
      <TabsContent value="day"><ProgressAnalytics /></TabsContent>
      <TabsContent value="week"><ProgressAnalytics /></TabsContent>
      <TabsContent value="month"><ProgressAnalytics /></TabsContent>
      <TabsContent value="last-week"><ProgressAnalytics /></TabsContent>
      <TabsContent value="last-month"><ProgressAnalytics /></TabsContent>
    </Tabs>

  )
}

export default ProgressTabs