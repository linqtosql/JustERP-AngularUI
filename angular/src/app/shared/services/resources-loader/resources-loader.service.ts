import { Injectable } from "@angular/core";
import * as $ from "jquery";

declare let document: any;

interface Resource {
    src: string;
    loaded: boolean;
}

@Injectable()
export class ResourceLoaderService {

    private _resources: Resource[] = [];

    load(tag, resources: string[], loadOnce = true) {

        resources.forEach((resource: string) => {
            if (this._resources[resource]) return;
            this._resources[resource] = { src: resource, loaded: false }
        });

        let promises: any[] = [];
        resources.forEach((resource) => promises.push(this.loadScript(tag, resource, loadOnce)));
        return Promise.all(promises);
    }

    loadScript(tag, src: string, loadOnce = true) {
        return new Promise((resolve, reject) => {

            //resolve if already loaded
            if (this._resources[src].loaded && loadOnce) {
                resolve({ script: src, loaded: true, status: 'Already Loaded' });
            }
            else {
                //load script
                let resource = this.buildElement(src);

                $(tag).append(resource);
                this._resources[src] = { src: src, loaded: true };
                resolve({ script: src, loaded: true, status: 'Loaded' });
            }
        });
    }

    buildElement(src: string): JQuery<HTMLElement> {
        if (src.endsWith('.js'))
            return $('<script/>')
                .attr('type', 'text/javascript')
                .attr('src', src);
        if (src.endsWith('.css'))
            return $('<link/>')
                .attr('rel', 'stylesheet')
                .attr('href', src);
    }
}