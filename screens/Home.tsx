import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Home: React.FC = () => {
  const [boy, setBoy] = useState('');
  const [kilo, setKilo] = useState('');
  const [bki, setBki] = useState<number | null>(null);
  const [durum, setDurum] = useState('');
  const navigation = useNavigation();
  const handleHesapla = () => {
    const boyNum = parseFloat(boy);
    const kiloNum = parseFloat(kilo);

    if (!isNaN(boyNum) && !isNaN(kiloNum)) {
      const bkiValue = kiloNum / ((boyNum / 100) * (boyNum / 100));
      setBki(bkiValue);
      handleDurum(bkiValue);
    } else {
      setBki(null);
    }
  };

  const handleDurum = (bki: number) => {
    if (bki < 18.5) {
      setDurum('Zayıf Kilolu - Kilonuzu artırmalısınız.');
    } else if (bki >= 18.5 && bki < 24.9) {
      setDurum('Normal Kilolu - Sağlıklı kilo aralığınızdasınız.');
    } else if (bki >= 25 && bki < 29.9) {
      setDurum('Fazla Kilolu - Kilonuzu azaltmalısınız.');
    } else {
      setDurum('Obez - Kilonuzu önemli ölçüde azaltmalısınız.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/wallpaper.jpg')}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Body Mass Index Calculation</Text>
            <TextInput
              style={styles.input}
              placeholder="Boy (cm)"
              keyboardType="numeric"
              value={boy}
              onChangeText={(text) => setBoy(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Kilo (kg)"
              keyboardType="numeric"
              value={kilo}
              onChangeText={(text) => setKilo(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleHesapla}
            >
              <Text style={styles.buttonText}>Calculate</Text>

            </TouchableOpacity>
            {bki !== null && (
              <Text style={styles.resultText}>
                Beden Kitle İndeksiniz: {bki.toFixed(2)}
              </Text>
            )}
            {durum !== '' && (
              <Text style={styles.durumText}>{durum}</Text>

            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Home;
