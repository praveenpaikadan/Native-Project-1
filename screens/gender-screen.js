import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  CreateAccountGraphics,
  GenderFemaleGraphics,
  GenderMaleGraphics,
} from "../assets/svgs/svg-graphics";
import { ButtonType1 } from "../components/buttons";
import { ElevatedCardTypeOne } from "../components/cards";
import { formPageStyles } from "../styles/form-pages-styles";

export default GenderScreen = ({ navigation, route }) => {
  const [maleSelected, setMaleSelected] = React.useState(false);
  const [femaleSelected, setFemaleSelected] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [validationMessage, setValidationMessage] = React.useState("");
  const data = { ...route.params };

  const selectionHandlerMale = () => {
    setMaleSelected(true);
    setFemaleSelected(false);
    setGender("male");
    setValidationMessage("");
  };
  const selectionHandlerFemale = () => {
    setMaleSelected(false);
    setFemaleSelected(true);
    setGender("female");
    setValidationMessage("");
  };

  const buttonClickHandler = () => {
    if (gender === "") {
      setValidationMessage("Please select gender");
    } else {
      navigation.push("HeightWeight", { ...data, gender: gender });
    }
  };

  return (
    <View
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.headerGraphicsContainer}>
          <CreateAccountGraphics style={{ width: "100%" }} />
          <View style={styles.heading}>
            <Text style={styles.mainHeading}>What is your {"\n"}Gender?</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.cardscontainer}>
            {/* {
                        [   
                            ['Male', <GenderMaleGraphics size={'75%'}/>],
                            ['Female',<GenderFemaleGraphics size={'75%'}/>]
                        ].map(data => (
                            
                            <TouchableOpacity key={data[0]}>   
                                <ElevatedCardTypeOne
                                styling={styles.card}>
                                    {data[1]}
                                    <Text style={styles.genderTag}>{data[0]}</Text>
                                </ElevatedCardTypeOne>
                            </TouchableOpacity>      
                            
                            )
                        )
                    } */}

            <TouchableOpacity onPress={selectionHandlerMale}>
              <ElevatedCardTypeOne
                styling={maleSelected ? styles.cardSelected : styles.card}
              >
                <GenderMaleGraphics size={"75%"} />
                <Text style={styles.genderTag}>Male</Text>
              </ElevatedCardTypeOne>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectionHandlerFemale}>
              <ElevatedCardTypeOne
                styling={femaleSelected ? styles.cardSelected : styles.card}
              >
                <GenderFemaleGraphics size={"75%"} />
                <Text style={styles.genderTag}>Female</Text>
              </ElevatedCardTypeOne>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.errorText}>{validationMessage}</Text>
            <ButtonType1
              styling={styles.submitButton}
              text={"NEXT"}
              onClick={buttonClickHandler}
            />
          </View>

          <View style={styles.footContainer}></View>
        </View>
      </View>
    </View>
  );
};

const styles = formPageStyles;
