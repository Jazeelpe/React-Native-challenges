import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';

const imageData = [
  {
    id: 1,
    image: require('../assets/icons/logo_1.png'),
  },
  {
    id: 2,
    image: require('../assets/icons/icon_no_plan.png'),
  },
  {
    id: 3,
    image: require('../assets/icons/dashcard.png'),
  },
];
const Welcome = () => {
  const {width} = useWindowDimensions();
  const [activeindex, setindex] = useState(0);
  const flatlistRef = useRef(null);

  const handlePagechange = event => {
    const xdirection = event.nativeEvent.contentOffset.x;
    let index = Math.round(xdirection / width);
    setindex(index);
  };

  return (
    <View style={style.maincontainer}>
      <View style={style.listcontainer}>
        <FlatList
          ref={flatlistRef}
          onScroll={handlePagechange}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={imageData}
          renderItem={({item, index}) => {
            return (
              <View style={style.swipecontainer}>
                <View style={style.imagecontainer}>
                  <Image
                    style={{width: 300, height: 300, resizeMode: 'contain'}}
                    source={item.image}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={style.dotcontainer}>
        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            if (activeindex > 0) {
              flatlistRef.current.scrollToIndex({
                index: activeindex - 1,
                animated: true,
              });
              setindex(activeindex - 1);
            }
          }}>
          <Text style={{fontSize: 19, fontWeight: '700', color: '#fff'}}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={style.dotsWrap}>
          {imageData.map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  style.dot,
                  {backgroundColor: index === activeindex ? 'green' : '#fff'},
                ]}></View>
            );
          })}
        </View>

        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            if (activeindex < imageData.length - 1) {
              flatlistRef.current.scrollToIndex({
                index: activeindex+1,
                animated: true,
              });
              setindex(activeindex + 1);
            }
          }}>
          <Text style={{fontSize: 19, fontWeight: '700', color: '#fff'}}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  listcontainer: {
    width: '100%',
    height: '90%',
    padding: 5,
  },
  swipecontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 400,
  },
  imagecontainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 5,
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  btn: {
    width: 100,
    height: '60%',
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dotsWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
