import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {NativeBaseProvider}  from 'native-base';
import {
  Text,
  Container,
  Heading,
  Content,
  Header,
  Card,
  Title,
  Body,
  H1, H3,
  Button
} from 'native-base';
import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

const itemArray = new Array(9).fill('empty');

const App = ()=>{

  let [isCross, setIsCross] = useState(false);
  let [winMessage, setWinMessage] = useState('');

  const changeItem = (itemNumber)=>{
    
    if(winMessage){
      return Snackbar.show({
        text: winMessage,
        backgroundColor: '#000',
        textColor: "#FFF"
    })
    }

    if(itemArray[itemNumber] == 'empty'){
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    }
    else{
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "#FFF",
        textColor: "#000",
      })
    }

    checkIsWinner();
    checkDraw();
  }

  const reloadGame = ()=>{
    console.log("I am pressed");
setIsCross(false);
setWinMessage('');
itemArray.fill('empty', 0, 9);
  }

  const checkDraw = ()=>{
    if(winMessage == ''){
      console.log(winMessage);
      if(itemArray.indexOf('empty') == -1){
        console.log(itemArray.indexOf('empty') == -1);
        setWinMessage('Game is Draw!!');
        Snackbar.show({
          text: "Game is Draw Buddy!!",
          backgroundColor: "#000",
          textColor: "#FFF"
        })
        return;
      }
    }
  }

  const checkIsWinner = ()=>{
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== 'empty' &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== 'empty' &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== 'empty' &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    }
  }

  return(
    <NativeBaseProvider> 
    <Container style={{backgroundColor: "#333945", marginTop:5, marginLeft: 32}}>
    
    <Heading style={{paddingLeft:28}}>
        <Text style={{color:"white"}}>TicTacToe Made With React Native</Text>
    </Heading>
    </Container> 


        <View style={styles.grid}>
          {itemArray.map((item, index)=>(
            <TouchableOpacity style={styles.box} key={index} onPress={()=>{changeItem(index)}}>
              <Card style={styles.card}>
                <Icons name={item}/>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
       
       {winMessage ? (
        <View>
          <Text style={styles.message}>{winMessage}</Text>
          <TouchableOpacity style={{backgroundColor: "#465283", width: 105, padding:16, color:"#FFF", marginLeft:115, marginBottom:60, marginTop:-70}} onPress={reloadGame}>
            <Text style={{marginLeft:19}} color="white">Reload Game</Text>
          </TouchableOpacity>
        </View>
       ) : (
          <Text style={styles.message}>{isCross ? 'Cross': 'Circle'} turns</Text>
       )}
    
 
    </NativeBaseProvider>
  )
}

export default App;

const styles = StyleSheet.create({
  grid:{
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20
  },
  box:{
    width: '33%',
    // marginBottom: 6,
    marginTop: 10
  },
  card:{
    height: 120,
    justifyContent: "center",
    alignItems: "center"
  },
  message:{
    textAlign: "center",
    textTransform: "uppercase",
    color: "#FFF",
    backgroundColor: "#465283",
    paddingVertical: 10,
    marginBottom: 130,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 85,
    borderRadius: 10
  }
})


