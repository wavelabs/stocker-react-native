import React from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanBarCodeModal extends React.Component {
  state = {
    hasCameraPermission: null,
    type: BarCodeScanner.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const {onBarCodeRead, visible} = this.props;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <View><Text>No access to camera</Text></View>;
    } else {
      return (
        <Modal
          visible={visible}
          onRequestClose={() => {}}
          >
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              style={[StyleSheet.absoluteFill, styles.container]}
              type={this.state.type}
              onBarCodeRead={onBarCodeRead}
            >
              <View style={styles.layerTop} />
                <View style={styles.layerCenter}>
                  <View style={styles.layerLeft} />
                  <View style={styles.focused} />
                  <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />
            </BarCodeScanner>

            <View style={styles.header}>
              <Text style={styles.headerText}>Escanear Código de Barras</Text>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                onPress={this.props.handlePressCancel}
                hitSlop={{ top: 80, bottom: 80, right: 80, left: 80 }}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  }
});

