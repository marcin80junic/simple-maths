import React, { useEffect, useState, useReducer, createContext } from "react"
import { Route, Routes } from "react-router-dom"
import "./styles/App.scss"
import Navbar from "./components/Navbar"
import HomePage from "./components/HomePage"
import Addition from "./components/Addition"
import Subtraction from "./components/Subtraction"
import Multiplication from "./components/Multiplication"
import Division from "./components/Division"
import Fractions from "./components/Fractions"
import Custom from "./components/Custom"
import Test from "./components/Test"
import Settings from "./components/Settings"
import PageNotFound from "./components/PageNotFound"


export const AppContext = createContext()

function App() {

  const getInitialSelection = () => {
    const href = window.location.href
    return href.substring(href.lastIndexOf("/") + 1)
  }

  const getInitialSettings = () => {
    const settings = localStorage.getItem("settings")
    return JSON.parse(settings) || {
      system: {
        volume: "50",
        mute: false
      },
      general: {
        randomizeAnswers: false,
        showTooltips: false
      },

    }
  }

  const getInitialOptions = () => {
    const options = localStorage.getItem("options")
    if (options) {
      return JSON.parse(options)
    } else {
      const constants = {
        level: ["fair", "advanced", "super hard"],
        count: [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]
      }
      const initialObj = {
        level: constants.level[0],
        count: constants.count[0]
      }
      return {
        constants,
        addition: initialObj,
        subtraction: initialObj,
        multiplication: initialObj,
        division: initialObj,
        fractions: initialObj,
        custom: initialObj,
        test: initialObj
      }
    }
  }

  const reducer = (options, action) => {
    switch (action.type) {
      case 'UPDATE_LEVEL':
        return {
          ...options,
          [selection]: {
            ...options[selection],
            level: action.value
          },
        }
      case 'UPDATE_COUNT':
        return {
          ...options,
          [selection]: {
            ...options[selection],
            count: action.value
          }
        }
      default: throw new Error("unrecognized action type")
    }
  }

  const [selection, setSelection] = useState(getInitialSelection())
  const [settings, setSettings] = useState(getInitialSettings())
  const [options, dispatchOptions] = useReducer(reducer, getInitialOptions())


  const handleNavigation = (href, reload) => {
    let newSelection = href.substring(href.lastIndexOf("/") + 1)
    if (newSelection === "") {
      newSelection = "home"
      href = `${href}home`
    }
    if (newSelection !== selection || reload) {
      const elements = document.querySelectorAll('.sidenav > a')
      elements.forEach((el) => {
        (el.href === href) ?
          el.classList.add("button3d-selected")
          : el.classList.remove("button3d-selected")
      })
      setSelection(newSelection)
    }
  }

  const handleSettingsChange = (section, event) => {
    const {name, value} = event.target
    switch (name) {
      case "mute":
        setSettings(prevSettings => {
          const oldValue = prevSettings[section][name]
          return {
            ...prevSettings,
            [section]: {
              ...prevSettings[section],
              [name]: !oldValue,
              oldVolume: prevSettings.system.volume,
              volume: oldValue ? prevSettings.system.oldVolume : "0"
            }
          }
        }) 
        break
      case "volume":
        setSettings(prevSettings => {
          return {
            ...prevSettings,
            [section]: {
              ...prevSettings[section],
              mute: false,
              [name]: value
            }
          }
        })
        break
      default:
        setSettings(prevSettings => {
          return {
            ...prevSettings,
            [section]: {
              ...prevSettings[section],
              [name]: value
            }
          }
        })
    }
    console.log("handling settings change")
  }


  useEffect(() => {
    handleNavigation(window.location.href, true)
  }, [])

  useEffect(() => {
    if (selection) {
      localStorage.setItem("settings", JSON.stringify(settings))
    }
  }, [settings])

  useEffect(() => {
    if (selection) {
      localStorage.setItem("options", JSON.stringify(options))
    }
  }, [options])


  return (
    <AppContext.Provider value={[settings, options.constants, dispatchOptions]}>
      <Navbar handleNavigation={handleNavigation} />
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="home" element={ <HomePage /> } />
        <Route path="addition" element={ <Addition options={options.addition} /> } />
        <Route path="subtraction" element={ <Subtraction options={options.subtraction} /> } />
        <Route path="multiplication" element={ <Multiplication options={options.multiplication} /> } />
        <Route path="division" element={ <Division options={options.division} /> } />
        <Route path="fractions" element={ <Fractions options={options.fractions} /> } />
        <Route path="custom" element={ <Custom options={options.custom} /> } />
        <Route path="test" element={ <Test options={options.test} /> } />
        <Route path="settings" element={<Settings handleSettingsChange={handleSettingsChange} /> } />
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>
    </AppContext.Provider>
  )
  
}

export default App;
