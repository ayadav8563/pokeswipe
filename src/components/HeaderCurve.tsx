import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

type HeaderCurveProps = {
  color?: string;
  height?: number;
};

function HeaderCurve({color = '#F3F2EF', height = 260}: Readonly<HeaderCurveProps>) {
  const {width} = useWindowDimensions();
  const waveWidth = width + 4;

  const d = `M-2,${height} C${width * 0.08},${height * 0.54} ${width * 0.42},${height * 0.18} ${width * 0.78},${height * 0.08} C${width * 0.92},${height * 0.04} ${width * 0.98},${height * 0.02} ${waveWidth},-1 L${waveWidth},${height} L-2,${height} Z`;

  return (
    <View style={[styles.container, {height}]}>
      <Svg width={waveWidth} height={height} style={styles.svg}>
        <Path d={d} fill={color} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  svg: {
    marginLeft: -1,
  },
});

export default HeaderCurve;