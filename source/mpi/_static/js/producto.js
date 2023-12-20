var producto =
{
    urlFormActn:'', urlBack:'',

    init()
    {
        const check_req_ns = document.querySelector('#check_req_ns');
        const check_req_lt = document.querySelector('#check_req_lt');
        const ipt_reqserie = document.querySelector('#ipt_reqserie');
        const ipt_reqlote = document.querySelector('#ipt_reqlote');
        const btn_submit = document.querySelector('#btn_submit');
        const ipt_unidad = document.querySelector('input[name="unidad"]');
        const ipt_factorb = document.querySelector('input[name="factorb"]');
        const ipt_unidadb = document.querySelector('input[name="unidadB"]');
        const msg_factor = document.querySelector('#mesage_factor');

        if (check_req_ns && ipt_reqserie) check_req_ns.addEventListener('change', e => { this.set_ipt_check_value(ipt_reqserie, check_req_ns) });
        if (check_req_lt && ipt_reqlote) check_req_lt.addEventListener('change', e => { this.set_ipt_check_value(ipt_reqlote, check_req_lt) });
        if (btn_submit) btn_submit.addEventListener('click', e => this.create_update_product());

        if (ipt_unidad && ipt_factorb && ipt_unidadb && msg_factor)
        {
            ipt_unidad.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_unidadb.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_factorb.addEventListener('change', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_factorb.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
        }
    },
    set_ipt_check_value(inputElement, checkElement)
    {
        console.log(checkElement.checked);
        inputElement.value = (checkElement.checked ? 1 : 0);
    },
    create_update_product()
    {
        const reqCall = control => 
        {
            let panel = control.closest('div[role="tabpanel"]');
            if (panel) {
                let tab = document.querySelector(`button[id="${panel.getAttribute('aria-labelledby')}"]`);
                if (tab) tab.click();
                control.focus();
            }
        }

        let data = main.getValues('form', true, reqCall);
        if (data==null) return;

        let d = {}
        Object.keys(data).forEach(k => {
            if (k.trim()!='') d[k]=data[k];
        });
        
        InduxsoftCrudlModel.InvokeService(this.urlFormActn, d,
            success => { console.log(success); window.location.href = this.urlBack; },
            failure => { alert('No fue posible guardar el producto.\n'+JSON.stringify(failure)); },
            "POST", false 
        );
    },
    valide_factor(unit1,factor,unit2,msg)
    {
        if (Number(factor.value) < 1) {
            msg.textContent = 'El factor debe ser mayor a 0';
            return;
        }
        if (unit1.value.trim()=='' || unit2.value.trim()=='') {
            msg.textContent = '';
            return;
        }
        if (unit1.value.trim() == unit2.value.trim()) {
            if (factor.value != 1) {
                msg.textContent = 'El factor no es correcto, debe ser 1';
                return;
            }
        }
        else {
            if (factor.value == 1) {
                msg.textContent = 'El factor no es correcto, debe ser diferente de 1';
                return;
            }
        }

        msg.textContent = `1 ${unit2.value} es equivalente a ${factor.value} ${unit1.value}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    producto.init();
});