import "./App.css";
import { 
  Formik, 
  Field, 
  FieldArray,
  Form
} from "formik";
import { 
  Button,
  Card,
  Container,
  Input,
  NextUIProvider,
  Spacer,
  Text,
} from '@nextui-org/react';

const App = () => {
  const getAllWeekDays = () => {
      var baseDate = new Date(Date.UTC(2017, 0, 2))
      var weekDays = []
      for (let i = 0; i < 7; i++) {       
          weekDays.push(baseDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase())
          baseDate.setDate(baseDate.getDate() + 1)
      }
      return weekDays
  }

  const getDayOfWeek = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
    }).toUpperCase()
  }

  return (
    <NextUIProvider className="App">
      <Container>
        <Spacer/>
        <Card>
          <Card.Body>
            <Text h1>Journaler</Text>
          </Card.Body>
        </Card>
        <Spacer/>
        <Formik
          initialValues={{
            date: "",
            dayOfTheWeek: `${getDayOfWeek()}`,
            score: 0,
            gratitudes: [],
            forgives: [],
            curiosities: [],
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {props => (
            <Form>
              <label htmlFor="day">Day: </label>
              <Field
                id="day"
                as="select" 
                name="dayOfTheWeek"
                type="day">
                {getAllWeekDays().map((d) => 
                  <option key={d} value={d}>{d}</option>
                )}
              </Field>
              
              <Spacer/>

              <label htmlFor="score">Score: </label>
              <Field name="score">
              {({ field, form, meta }) => (
                <Input id="score" name="score" type="number" min="0" max="10" onChange={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0
                  } else if (e.target.value > 10) {
                    e.target.value = 10
                  }
                }}/>
              )}
              </Field>
              <label>/10</label>
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
