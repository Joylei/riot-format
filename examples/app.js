import riot from 'riot';

//has to do it this way, because import behavior
//and we want it takes effect before we import any tags
import './format';
import './tags/app.html';

riot.mount('app');
