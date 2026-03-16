import { use, useRef, useState } from "react"

function App() {

  const [Show, setShow] = useState(false);
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [edit, setedit] = useState(false);
  const [editIndex, seteditIndex] = useState(-1);
  const [View, setView] = useState(false)
  const [Vdata, setVdata] = useState({})
  const [Backdrop, setBackdrop] = useState(false)

  const handleDelete = (index) => {
    let copiedData = [...Tasks];
    copiedData.splice(index, 1);
    setTasks(copiedData);
  }

  const handleEdit = (idx) => {
    setedit(true);
    const dup = Tasks[idx];
    setTitle(dup.Title)
    setDesc(dup.Desc)
    seteditIndex(idx);
  }
  const handleView = (idx) => {
    const dup = Tasks[idx];
    setVdata(dup);
  }

  const handleEditIndex = () => {
    setTasks(prev =>
      prev.map((tasks, index) =>
        index === editIndex
          ? { ...tasks, Title, Desc }
          : tasks
      )
    )
    setDesc("");
    setTitle("");
    setedit(false);
  }

  return (
    <>
      <div className={`bg-zinc-800 text-white w-full min-h-screen p-10`}>
        <div className="max-w-[1500px] mx-auto my-0 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          <div
            onClick={() => {
              setShow(s => !s);
            }}
            className="card min-h-30 bg-zinc-700 rounded-xl border-2 border-dashed border-white/80 flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-400">
            <span className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center"><i class="fa-solid fa-plus"></i></span>{/*Icon*/}
            <p className="p-1">Add new notes</p>
          </div>

          {Show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* BACKDROP */}
              <div
                className="fixed inset-0 bg-zinc-700/80"
                onClick={() => setShow(false)} // close modal when clicking outside
              ></div>

              {/* MODAL */}
              <div className="relative z-10 bg-zinc-800 w-[400px] p-5 rounded-2xl border border-white">
                <h3 className="text-xl text-zinc-200 font-bold pb-3">Add a New Note</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (Title.trim() === "" || Desc.trim() === "") {
                      alert("Please enter the Fields!!!");
                      return;
                    }
                    setTasks([...Tasks, { Title, Desc }]);
                    setDesc("");
                    setTitle("");
                    setShow(false);
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  <input
                    value={Title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                    className="w-full border border-white px-4 py-2 rounded-lg"
                    type="text"
                    placeholder="Enter Heading..."
                  />
                  <textarea
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full border border-white px-4 py-2 rounded-lg"
                    rows="10"
                    placeholder="Enter Description Here..."
                  ></textarea>
                  <button
                    className="bg-blue-500 w-full font-bold tracking-wider py-2 rounded-xl cursor-pointer">
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          )}


          {Tasks.map((items, index) => {
            return (
              <div key={index}
              onClick={() => {
                  handleView(index)
                  setView(true)
                }
                }
                className="card min-h-30 bg-zinc-700 rounded-xl border-3 border-solid border-white/40 flex flex-col justify-center items-start cursor-pointer hover:scale-105 duration-400 p-5 gap-1">
                <div
                  className="w-full flex justify-between">
                  <span className="w-[80%]">
                    <h1 className="text-3xl font-bold tracking-wide break-words line-clamp-2">{items.Title}</h1>
                  </span>
                  <div className="w-[15%] flex justify-end">
                    <span
                      onClick={() => {
                        handleDelete(index);
                      }}
                      className="w-7 h-7 bg-cyan-200 text-red-700 text-xl flex justify-center items-center rounded">
                      <i className="fa-solid fa-x"></i>
                    </span>
                  </div>
                </div>
                <p className="text-lg font-medium break-words break-all whitespace-pre-wrap line-clamp-2">
                  {items.Desc}
                </p>

                <div
                  className="w-full flex justify-end ">
                  <div className="w-[20%] flex justify-between">
                    {/* View Button */}
                    <div
                      className="hover:bg-green-300 hover:text-black p-1 transition-colors duration-300 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(index)
                        setView(true)
                      }
                    }
                    >
                      <i class="fa-solid fa-eye"></i>
                    </div>
                    {/* Edit Button */}
                    <div className="hover:bg-amber-300 hover:text-black p-1 transition-colors duration-300 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(index)
                      }}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {edit && <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-zinc-700/80"
              onClick={() => setBackdrop(true)} // close modal when clicking outside
            ></div>

            {/* MODAL */}
            <div className="relative z-10 bg-zinc-800 w-[400px] p-5 rounded-2xl border border-white">
              <h3 className="text-xl text-zinc-200 font-bold pb-3">Edit Note</h3>
              <form
                onSubmit={(e) => {
                  

                }}
                className="flex flex-col items-center gap-3"
              >
                <input
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-white px-4 py-2 rounded-lg"
                  type="text"
                  placeholder="Enter Heading..."
                />
                <textarea
                  value={Desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full border border-white px-4 py-2 rounded-lg"
                  rows="10"
                  placeholder="Enter Description Here..."
                ></textarea>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditIndex();
                    setBackdrop(false)
                    console.log(Title, Desc)
                  }}
                  className="bg-blue-500 w-full font-bold tracking-wider py-2 rounded-xl cursor-pointer">
                  Save Changes
                </button>
                {Backdrop && <p className="text-red-600 text-center">Edit the content or click on "save changes" button❗❗❗</p>}
              </form>
            </div>
          </div>
          }


        </div>

        {View &&
          <div>
            {/* BackDrop */}
            <div className="fixed inset-0 bg-gray-800/70 min-h-96"></div>

            {/* Main container that shows the content */}

            <div className="mx-auto w-[90%] lg:w-[80%] absolute top-20 left-6 sm:left-10 lg:left-28 h-[600px]">
              <div className="h-full w-full  flex">
                <div className="h-full w-[80%] bg-black rounded-l-2xl p-4">
                  <div className=" h-full w-full border-2 border-t-0 border-solid border-white overflow-y-auto relative">
                    <h3 className="text-2xl font-semibold border p-2 border-l-0 border-r-0 border-amber-50 sticky top-0 bg-black"><span className="text-3xl">Title : </span> "{Vdata.Title}"</h3>
                    <p className=" p-2 wrap-break-word"><span className="text-2xl"> Description : </span>"{Vdata.Desc}"</p>
                  </div>
                </div>
                <div className="h-full w-[20%] bg-cyan-900 rounded-r-2xl">
                  <div
                    className="h-[8%] w-full  relative"
                    onClick={() =>
                      setView(false)
                    }
                  >
                    <span className="absolute right-2 top-2 bg-fuchsia-400 p-1 hover:scale-110 cursor-pointer active:scale-100">❌</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default App



