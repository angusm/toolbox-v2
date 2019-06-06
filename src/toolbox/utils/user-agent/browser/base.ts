import { contains } from '../../string/contains';
import { USER_AGENT_STRING } from '../string';
import {MultiValueMap} from "../../map/multi-value";
import {map} from '../../iterable-iterator/map';
import {isDefined} from "../../is-defined";
import {reverseMap} from "../../map/reverse-map";

type TOffset = [string, number];

abstract class Browser {
  protected static name_: string;
  protected static uaidsWithOffsets_: [string, TOffset[]][];
  protected static genericStylePropertyToSupported_: Map<string, string>;
  protected static supportedStylePropertyToGeneric_: Map<string, string>;
  protected static genericStyleValueToSupported_: MultiValueMap<string, string>;
  protected static supportedStyleValueToGeneric_: MultiValueMap<string, string>;

  public static getAsCSSModifier() {
    return this.name_.toLowerCase().replace(/\s/, '-');
  }

  public static getName(): string {
    return this.name_;
  }

  protected static getUaids_(): string[] {
    return this.uaidsWithOffsets_.map(([uaid, x]: [string, TOffset[]]) => uaid);
  }

  public static isCurrentBrowser(): boolean {
    return this.getUaids_().some((uaid: string) =>
      contains(USER_AGENT_STRING, uaid)
    );
  }

  public static getVersion(): number {
    const [uaid, offsets]: [string, TOffset[]] = this.uaidsWithOffsets_.find(
      ([uaid, x]: [string, TOffset[]]) => contains(USER_AGENT_STRING, uaid)
    );

    const [browserName, offsetToVersionNumber]: TOffset =
      offsets.find(
        (offset: TOffset) => contains(USER_AGENT_STRING, <string>offset[0]));

    const startIndex: number =
      USER_AGENT_STRING.indexOf(<string>browserName) + offsetToVersionNumber;

    const rawVersion = USER_AGENT_STRING.substring(startIndex);

    const trimmedVersion: string = rawVersion
      .split(';')[0]
      .split(' ')[0]
      .split(')')[0];
    return parseFloat(trimmedVersion);
  }

  public static getMajorVersion(): number {
    return Math.floor(this.getVersion());
  }

  public static getSupportedStyleValue(
    genericStyleProperty: string,
    genericStyleValue: string
  ): string {
    const supportedValue =
      this.genericStyleValueToSupported_
        .get([genericStyleProperty, genericStyleValue]);
    return isDefined(supportedValue) ? supportedValue : genericStyleValue;
  }

  public static getGenericStyleValue(
    genericStyleProperty: string,
    supportedStyleValue: string
  ): string {
    const genericValue =
      this.getSupportedStyleValueToGenericMap_()
        .get([genericStyleProperty, supportedStyleValue]);
    return isDefined(genericValue) ? genericValue : supportedStyleValue;
  }

  public static getSupportedStyleProperty(
    genericStyleProperty: string
  ): string {
    const supportedProperty =
      this.genericStylePropertyToSupported_.get(genericStyleProperty);
    return isDefined(supportedProperty) ?
      supportedProperty : genericStyleProperty;
  }

  public static getGenericStyleProperty(
    supportedStyleProperty: string
  ): string {
    const genericProperty =
      this.getSupportedStylePropertyToGenericMap_().get(supportedStyleProperty);
    return isDefined(genericProperty) ?
      genericProperty : supportedStyleProperty;
  }

  protected static getSupportedStyleValueToGenericMap_(
    // void
  ): MultiValueMap<string, string> {
    if (!this.supportedStyleValueToGeneric_) {
      this.supportedStyleValueToGeneric_ =
        new MultiValueMap([
          ...map<[string[], string], [string[], string]>(
            this.genericStyleValueToSupported_.entries(),
            ([[genericProperty, genericValue], supportedValue]) => {
              return [[genericProperty, supportedValue], genericValue]
            })
        ]);
    }
    return this.supportedStyleValueToGeneric_;
  }

  protected static getSupportedStylePropertyToGenericMap_() {
    if (!this.supportedStylePropertyToGeneric_) {
      this.supportedStylePropertyToGeneric_ =
        reverseMap(this.genericStylePropertyToSupported_);
    }
    return this.supportedStylePropertyToGeneric_;
  }
}

export { Browser, TOffset };
