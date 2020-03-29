import { Injectable, Injector, ComponentFactoryResolver, EmbeddedViewRef, ApplicationRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private childComponentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public appendComponentTo(parentId: string, child: any, childConfiguration?: ChildConfig) {
    // Create a component reference from the component
    const childComponentRef = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector);

    // Attach config to the child (inputs and outputs)
    this.attachConfig(childConfiguration, childComponentRef);

    // Get the child component with the attached properties
    this.childComponentRef = childComponentRef;

    // Attach component to the appRef so that it's in the ng component tree
    this.appRef.attachView(childComponentRef.hostView);

    // Get Dom element from the component
    const childDomElement = (childComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    // Append DOM element to to the body
    document.getElementById(parentId).appendChild(childDomElement);
  }

  public popComponentFrom(parentId: string) {
    // Remove child from parent element
    const elementContainer = document.getElementById(parentId);
    elementContainer.removeChild(elementContainer.childNodes[0]);
    return elementContainer.childNodes.length;
  }

  public removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }

  private attachConfig(config, componentRef) {
    const inputs = config.inputs;
    const outputs = config.outputs;
    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) componentRef.instance[key] = inputs[key];
    }
    for (const key in outputs) {
      if (outputs.hasOwnProperty(key)) componentRef.instance[key] = inputs[key];
    }
  }
}

interface ChildConfig {
  inputs: object;
  outputs: object;
}

