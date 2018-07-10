import RX = require("reactxp");
import Styles = require("../../styles/main");

import {Component} from "reactxp/dist/common/Interfaces";
import {Dimensions} from "reactxp/dist/common/Types";
import {CheckBox} from "../../components/CheckBox";
import {TabView} from "../TabView";
import {WorldMapTabController} from "./WorldMapTabController";
import {WorldMapTabState} from "./WorldMapTabState";
import {Vector3i} from "./WorldMapTabState";

export class WorldMapTabView extends TabView<WorldMapTabState> {
  private imageWidth: number = 0;
  private imageHeight: number = 0;
  private imageRef: Component<any, any> = new Component<any, any>();
  private center: Vector3i = {} as Vector3i;
  private surface: boolean = true;
  private mapBlockWidth: number = 0;
  private mapBlockLength: number = 0;

  public render() {
    const controller: WorldMapTabController = this.props.model.getController() as WorldMapTabController;
    return (
      <RX.ScrollView>
        <CheckBox text={"Surface"} onCheckedChange={(checked) => this.surface = checked} checkedByDefault={this.surface}/>
        <RX.View style={Styles.flex.row}>
          <RX.Text>Center:</RX.Text>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(x) => this.center.x = Number(x) > 250 ? 250 : Number(x)}/>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(y) => this.center.y = Number(y) > 250 ? 250 : Number(y)}/>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(z) => this.center.z = Number(z) > 250 ? 250 : Number(z)}/>
        </RX.View>
        <RX.View style={Styles.flex.row}>
          <RX.Text>Width:</RX.Text>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(width) => this.mapBlockWidth = Number(width)}/>
          <RX.Text>Length:</RX.Text>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(length) => this.mapBlockLength = Number(length)}/>
        </RX.View>
        <RX.Button
          style={Styles.okButton}
          onPress={() => controller.sendWorldMapData(this.center, this.mapBlockWidth, this.mapBlockLength, this.surface)}>Submit</RX.Button>
        <RX.View>
          <RX.Image ref={(ref) => this.imageRef = ref}
                    onLoad={(dimensions) => this.onImageLoad(dimensions)}
                    style={RX.Styles.createImageStyle({width: this.imageWidth, height: this.imageHeight})}
                    source={"data:image/png;base64," + this.state.mapImage}/>
        </RX.View>
      </RX.ScrollView>
    );
  }

  private onImageLoad(dimensions: Dimensions) {
    this.imageWidth = dimensions.width;
    this.imageHeight = dimensions.height;
    this.forceUpdate();
  }

}
