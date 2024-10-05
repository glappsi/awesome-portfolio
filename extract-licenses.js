import tpl from './third-party-licenses.json' with { type: "json" };
import clipboardy from 'clipboardy';

const result = [];
for (const p in tpl) {
  result.push({
    dependency: p,
    license: tpl[p].licenses
  });
}

console.log(JSON.stringify(result));
clipboardy.writeSync(`Hier die Liste der aktualisierten Abhängigkeiten. Bitte analysiere auf kommerzielle Nutzung unter Berücksichtigung deiner gespeicherten Informationen meines Projektes. Antworte mit einer kurzen Zusammenfassung. ${JSON.stringify(result)}`);