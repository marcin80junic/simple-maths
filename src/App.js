import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import "./styles/App.scss"
import Navbar from "./components/Navbar"
import HomePage from "./components/HomePage"
import Addition from "./components/Addition"
import Subtraction from "./components/Subtraction"
import Multiplication from "./components/Multiplication"
import Division from "./components/Division"
import Fractions from "./components/Fractions"
import Test from "./components/Test"
import Settings from "./components/Settings"
import PageNotFound from "./components/PageNotFound"


function App() {

  const getInitialSelection = () => localStorage.getItem("selection") || "home"
  const getInitialSettings = () => {
    const settings = localStorage.getItem("settings")
    return JSON.parse(settings) || {}
  }

  const [selection, setSelection] = useState(getInitialSelection())
  const [settings, setSettings] = useState(getInitialSettings())

  useEffect(() => {
    localStorage.setItem("selection", selection)
  }, [selection])

  useEffect(() => {
    const elements = document.querySelectorAll('.sidenav > a')
    elements.forEach((el) => {
      if (el.href.endsWith(selection)) {
        el.classList.add("selected")
      }
    })
  }, [])

  const handleNavigation = (href) => {
    const newSelection = href.substring(href.lastIndexOf("/") + 1)
    if (newSelection !== selection) {
      const elements = document.querySelectorAll('.sidenav > a')
      elements.forEach((el) => {
        (el.href === href) ?
          el.classList.add("selected")
          : el.classList.remove("selected")
      })
      setSelection(newSelection)
    }
  }

  return (
    <>
      <Navbar selection= {selection} handleNavigation={handleNavigation} />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="addition" element={<Addition settings={settings} />} />
        <Route path="subtraction" element={<Subtraction settings={settings} />} />
        <Route path="multiplication" element={<Multiplication settings={settings} />} />
        <Route path="division" element={<Division settings={settings} />} />
        <Route path="fractions" element={<Fractions settings={settings} />} />
        <Route path="test" element={<Test />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;
