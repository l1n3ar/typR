import { Lesson, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Lesson[]> {
  // TODO write API to fetch the data
  return [
    {
      "id" : "B-001",
      name: "Learn the basic keys",
      type: "Practice",
      level: "Basic",
   
  },
  {
      "id" : "B-002",
      name: "Learn the basic keys",
      type: "Practice",
      level: "Basic",
     
  },
  {
      "id" : "I-001",
      name: "Learn the basic keys",
      type: "Instructional",
      level: "Intermediate",
    
  },
  {
      "id" : "A-001",
      name: "Learn the basic keys",
      type: "Practice",
      level: "Advanced",
    
  },
  {
      "id" : "A-002",
      name: "Learn the basic keys",
      type: "Instructional",
      level: "Advanced",
    
  },
    // ...
  ]
}

export default async function Lessons() {
  const data = await getData()

  return (
    <div className="h-full w-screen bg-white rounded-lg flex flex-col gap-2">
      
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  )
}
