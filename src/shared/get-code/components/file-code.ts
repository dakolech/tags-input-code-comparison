import { DOMComponent } from '../lib/components.ts';
import { Inject } from '../lib/injector.ts';
import { ShowFile } from '../services/show-file.ts';
import { Subject } from 'rxjs';

export class FileCode extends DOMComponent {
  public code: Subject<string>;
  @Inject(ShowFile)
  private ShowFile: ShowFile;

  constructor(
    private name
  ) {
    super();
    this.code = this.ShowFile.get(name);
  }

  public render() {
    return `
      <div>
        <pre><code class='javascript' subscribe='code'></code></pre>
      </div>
    `;
  }
}
