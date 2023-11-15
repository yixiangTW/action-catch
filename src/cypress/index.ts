import { Ctx, EventTypeProps } from '../types/model';

function handleCheck(ctx: EventTypeProps) {
  const { isChecked } = ctx;
  if (isChecked) {
    return '.check()';
  }
  return '.uncheck()';
}

function handleType(ctx: EventTypeProps) {
  const typeContent = ctx.value;
  const isEnter = ctx.isEnter ? '{enter}' : '';
  return `.type('${typeContent}${isEnter}')`;
}

function handleSelect(ctx: EventTypeProps) {
  const selectContent = ctx.content;
  return `.select('${selectContent}')`;
}

function exchangeCtxToCypress(context: Ctx) {
  const steps = Object.keys(context).map((key) => {
    const ctx = context[key];
    let code = '';
    const eventType = key.split('-')[1];
    if (ctx.id) {
      code = `cy.get('#${ctx.id}')`;
    } else if (ctx.content) {
      code = `cy.contains('${ctx.content}')`;
    } else if (ctx.xPath) {
      code = `cy.get('${ctx.xPath}')`;
    }

    if (eventType === 'type') {
      code += handleType(ctx);
    }
    if (eventType === 'click') {
      code += '.click()';
    }
    if (eventType === 'select') {
      code += handleSelect(ctx);
    }
    if (eventType === 'check') {
      code += handleCheck(ctx);
    }
    code += ';';
    return code;
  }).join('\n');

  return `describe('template spec', () => {
  it('passes', () => {
    ${steps}
  });
});`;
}

export default exchangeCtxToCypress;
