import {Matrix} from './matrix';
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {renderLoop} from "../../render-loop";
import {forEach} from "../../iterable-iterator/for-each";


class MatrixService {
  private static singleton_: MatrixService = null;
  private cleanMatrix_: DynamicDefaultMap<HTMLElement, Matrix>;
  private alteredMatrix_: DynamicDefaultMap<HTMLElement, Matrix>;

  constructor() {
    this.cleanMatrix_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => Matrix.fromElementTransform(element));
    this.alteredMatrix_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => this.cleanMatrix_.get(element));
    this.init_();
  }

  private init_() {
    this.renderLoop_();
  }

  public getCleanMatrix(element: HTMLElement) {
    return this.cleanMatrix_.get(element);
  }

  public getAlteredMatrix(element: HTMLElement) {
    return this.alteredMatrix_.get(element);
  }

  public getAlteredXTranslation(element: HTMLElement) {
    return this.getAlteredMatrix(element).getTranslateX() -
      this.getCleanMatrix(element).getTranslateX();
  }

  public getAlteredYTranslation(element: HTMLElement) {
    return this.getAlteredMatrix(element).getTranslateY() -
      this.getCleanMatrix(element).getTranslateY();
  }

  public translate(element: HTMLElement, vector: {x: number, y: number}): void {
    this.alteredMatrix_.set(
      element, this.alteredMatrix_.get(element).translate(vector));
  }

  private renderLoop_() {
    renderLoop.anyMutate(() => {
      const entries = this.alteredMatrix_.entries();

      forEach(
        entries,
        ([element, alteredMatrix]) => {
          alteredMatrix.applyToElementTransform(element);
        });

      renderLoop.anyCleanup(() => {
        this.cleanMatrix_.clear();
        this.alteredMatrix_.clear();
        this.renderLoop_();
      });
    });
  }

  public static getSingleton(): MatrixService {
    return this.singleton_ = this.singleton_ || new this();
  }
}

export {MatrixService};
