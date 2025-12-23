import { Dialog, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
const DialogBox=(config)=>{
  const [dialog,setDialog]=useState(true);
  const {dialogBox,uploadInstruction} =config;
  // console.log("dialog",dialogBox.points)
  // console.log("inst",uploadInstruction)
  return(
      <Dialog open={dialog} size="md" style={{maxHeight:"85vh"}} handler={() => setDialog(false)} className="bg-gray-200 p-4  top-9  overflow-y-scroll scroll-smooth hover:scr rounded-lg shadow-xl no-scrollbar dark:bg-gray-700 outline-none dark:text-blue-gray-300">
          <XMarkIcon className="z-50 sticky top-0 h-6 w-6  border bg-gray-50 rounded bold shadow-gray-900 shadow-md float-right cursor-pointer hover: text-gray-800 hover:bg-red-600 dark:bg-blue-gray-500 dark:hover:bg-red-800
          transition-transform 
          duration-200 
          ease-in-out 
          hover:scale-125 font-extrabold" onClick={() => setDialog(false)} />
              <Typography variant="h3" className="font-roboto text-center  ">
                {dialogBox?.title}
              </Typography>
            <Typography className="p-4 text-gray-900 text-center font-roboto font-semi dark:text-blue-gray-200 ">
              <span className="font-semibold">{dialogBox?.content}</span>
              <hr  className="bg-gray-600 py-px rounded-full dark:text-gray-600"/>
              <ul  className="text-gray-700 space-y-2 mt-4 list-decimal overflow-auto list-inside">
                {dialogBox?.points.map((point, index) => (
                    <li key={index} className="text-left dark:text-blue-gray-300">{point.point}</li>
                ))
                }
              </ul>
              <hr className="bg-gray-600 py-px rounded-full" />
                {uploadInstruction && (
                  <>
                    <p className="font-bold text-gray-700 underline p-2 dark:text-blue-gray-200">{uploadInstruction.title}</p>
                    <div className="grid  w-full gap-y-5 gap-x-4 lg:grid-cols-2  md:grid-cols-3">
                      {uploadInstruction.fields.map((field,index)=>(
                        <>
                          <div className="grid relative gap-3 border border-gray-200 dark:text-blue-gray-500 dark:border-0 dark:shadow-2xl rounded-lg shadow-md">
                            <h1 key={index} className="text-gray-700 dark:text-blue-gray-300 text-sm px-5">{field.label}<span>({field.type})</span></h1>
                          
                          <div key={index} className=" mb-4 flex items-center justify-center space-x-4 ">
                          {field.sampleImage && (
                            <>
                              <div className=" flex flex-col items-center gap-2 ">
                                <img src={field.sampleImage} alt={field.label} className="h-32 object-fill rounded-lg border border-gray-200 dark:border-0 dark:shadow-lg" />
                                <IoCheckmark className="text-5xl text-green-600 font-extrabold" />
                                </div>
                                <div className=" flex flex-col gap-2 items-center justify-center">
                                <img src={field.sampleImage} alt={field.label} className=" h-32 blur-[1px] object-fill rounded-lg border border-gray-200 dark:border-0 dark:shadow-lg" />
                                <RxCross1 className="text-5xl text-red-500 font-extrabold" />
                                </div>
                              </>

                          )}
                          </div>
                          </div>
                        </>
                    ))}
                    </div>

                  </>
                )}
                <hr className="bg-gray-600 py-px rounded-full" />
                <p className="font-bold text-gray-700 underline p-2 dark:text-blue-gray-300">Notes</p>
              <ul  className="text-gray-700 space-y-2 mt-4 list-decimal overflow-auto list-inside">
                {dialogBox.notes && dialogBox.notes.map((note, index) => (
                    <li key={index} className="text-left dark:text-blue-gray-300">{note.point}</li>
                  ))}
              </ul>
              <p className="font-bold text-gray-700 underline py-2 dark:text-blue-gray-200 ">Thank you for your cooperation!</p>
            </Typography>
        </Dialog>
  )
}
export default DialogBox;