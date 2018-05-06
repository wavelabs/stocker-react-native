import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class ScanBarCodeModal extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const {onBarCodeRead, visible, onClose} = this.props;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <View><Text>No access to camera</Text></View>;
    } else {
      return (
        <Modal
          visible={visible}
          onRequestClose={onClose}
          >
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}
              onBarCodeRead={onBarCodeRead}>
            </Camera>
          </View>
        </Modal>
      );
    }
  }
}
