import { Injectable } from "@angular/core";
import * as $ from 'jquery';

declare let document: any;

interface Resource {
    src: string;
    loaded: boolean;
}

@Injectable()
export class ResourceLoaderService {

    private _resources: Resource[] = [];
    private tag: any;

    load(tag, ...resources: string[]) {
        this.tag = tag;
        resources.forEach((resource: string) => this._resources[resource] = { src: resource, loaded: false });

        let promises: any[] = [];
        resources.forEach((resource) => promises.push(this.loadScript(resource)));
        return Promise.all(promises);
    }

    loadScript(src: string) {
        return new Promise((resolve, reject) => {

            //resolve if already loaded
            if (this._resources[src].loaded) {
                resolve({ script: src, loaded: true, status: 'Already Loaded' });
            }
            else {
                //load script
                let resource = this.buildElement(src);

                $(this.tag).append(resource);
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