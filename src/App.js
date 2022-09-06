import { 
  Formik, 
  Field, 
  FieldArray,
  Form
} from "formik"
import { 
  Button,
  Card,
  Container,
  createTheme,
  Dropdown,
  Input,
  NextUIProvider,
  Spacer,
  Switch,
  Text,
  Textarea,
} from "@nextui-org/react"
import useDarkMode from "use-dark-mode"
import "./App.css";
import { saveJournal } from "./journal"

const lightTheme = createTheme({
  type: "light",
})

const darkTheme = createTheme({
  type: "dark",
})

const App = () => {
  const darkMode = useDarkMode(true)

  const today = new Date()

  const getFormattedDate = () => {
    const month = today.getMonth() + 1
    const day = today.getDate().toString().padStart(2, "0")
    const year = today.getFullYear() - 2000
    return `${month}.${day}.${year}`
  }

  const getAllWeekDays = () => {
      const baseDate = new Date(Date.UTC(2017, 0, 2))
      const weekDays = []
      for (let i = 0; i < 7; i++) {       
          weekDays.push(baseDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase())
          baseDate.setDate(baseDate.getDate() + 1)
      }
      return weekDays
  }

  const getDayOfWeek = () => {
    return today.toLocaleDateString("en-US", {
      weekday: "long",
    }).toUpperCase()
  }

  return (
    <NextUIProvider className="App" theme={darkMode.value ? darkTheme : lightTheme}>
      <Container>
        <Spacer/>
        <Card>
          <Card.Body>
            <Text h1>Journaler</Text>
          </Card.Body>
        </Card>
        <label htmlFor="Switch">Dark Mode: </label><br/>
        <Switch
          checked={darkMode.value}
          onChange={() => darkMode.toggle()}
        />
        <Spacer/>
        <Formik
          initialValues={{
            date: `${getFormattedDate()}`,
            dayOfTheWeek: `${getDayOfWeek()}`,
            score: 0,
            gratitudes: ["", "", ""],
            forgives: ["", "", ""],
            curiosities: ["", "", ""],
            entry: ""
          }}
          onSubmit={async (values) => {
            saveJournal(values)
          }}
        >
          {props => (
            <Form>
              <Text h2>Meta</Text>
              <label htmlFor="day">Day: </label>
              <Field
                id="day"
                as="select" 
                name="dayOfTheWeek"
                type="day">
                {({ field, form, meta }) => (
                <Dropdown>
                  <Dropdown.Button flat>{props.values.dayOfTheWeek}</Dropdown.Button>
                  <Dropdown.Menu aria-label="days-of-week" name="dayOfWeek" onAction={(val) => {
                    form.setFieldValue("dayOfTheWeek", val)
                    console.log(val)
                }}>
                    {getAllWeekDays().map((d) => 
                      <Dropdown.Item key={d} value={d}>{d}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                )}
              </Field>
              
              <Spacer/>

              <label htmlFor="score">Score: </label>
              <Field name="score">
              {({ field, form, meta }) => (
                <Input id="score" name="score" type="number" min="0" max="10" step="0.25" onChange={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0
                  } else if (e.target.value > 10) {
                    e.target.value = 10
                  }
                  props.handleChange(e)
                }}/>
              )}
              </Field>
              <label> / <b>10</b></label>

              <Spacer/>

              <Text h2>Gratitude</Text>
              <FieldArray name="gratitudes" render={arrayHelpers => (
                <section>
                  {props.values.gratitudes.map((grat, index) => (
                    <section key={`section.${index}`}>
                      <label key={`label.${index}`}>{index + 1}. </label>
                      <Input key={`grat.${index}`} name={`gratitudes.${index}`} value={grat} className="long-field" onChange={props.handleChange}/>
                      <Spacer key={`spacer.${index}`}/>
                    </section>
                  ))}
                </section>
              )}/>

              <Text h2>Forgiveness</Text>
              <FieldArray name="forgives" render={arrayHelpers => (
                <section>
                  {props.values.forgives.map((forg, index) => (
                    <section key={`section.${index}`}>
                      <label key={`label.${index}`}>{index + 1}. </label>
                      <Input key={`for.${index}`} name={`forgives.${index}`} value={forg} className="long-field" onChange={props.handleChange}/>
                      <Spacer key={`spacer.${index}`}/>
                    </section>
                  ))}
                </section>
              )}/>

              <Text h2>Curiosity</Text>
              <FieldArray name="curiosities" render={arrayHelpers => (
                <section>
                  {props.values.curiosities.map((cur, index) => (
                    <section key={`section.${index}`}>
                      <label key={`label.${index}`}>{index + 1}. </label>
                      <Input key={`cur.${index}`} name={`curiosities.${index}`} value={cur} className="long-field" onChange={props.handleChange}/>
                      <Spacer key={`spacer.${index}`}/>
                    </section>
                  ))}
                </section>
              )}/>

              <Text h2>Entry</Text>
              <Field name="entry" as="textarea">
              {({ field, form, meta }) => (
                <Textarea name="entry" id="journal-entry" onChange={props.handleChange} />
              )}
              </Field>

              <Spacer/>

              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </NextUIProvider>
  );
}

export default App;
