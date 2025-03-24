import React, { useState, useEffect } from "react"

export default function Messages() {
  // This simple component should display a message text after a
  // brief delay (1 second) once a button is clicked. The message
  // text should correspond to the button that was clicked.
  //
  // It seems to be working fine at first, but after a few clicks
  // we notice that the message and clicked button are not in sync.
  //
  // Your task here is to fix the issue and make sure that the message
  // from last clicked button is always displayed.
  //
  // HINT: You have a memory leak :) Maybe useEffect documentation
  // can provide you with some guidance.
  const [displaySuccess, setDisplaySuccess] = useState("")
  const [sendMessage, setSendMessage] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplaySuccess(sendMessage)
    }, 1000)
  }, [sendMessage])

  return (
    <main>
      <h1>Home Page</h1>
      <section>
        {displaySuccess && (
          <p>This is the button you clicked: {displaySuccess}</p>
        )}
        <form>
          <p>Click a button</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              padding: "10px",
            }}
          >
            <button
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={(e) => {
                e.preventDefault()
                setSendMessage("Button#1")
              }}
            >
              Button#1
            </button>
            <button
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={(e) => {
                e.preventDefault()
                setSendMessage("Button#2")
              }}
            >
              Button#2
            </button>
            <button
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={(e) => {
                e.preventDefault()
                setSendMessage("Button#3")
              }}
            >
              Button#3
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
