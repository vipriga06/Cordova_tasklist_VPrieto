(function(){
	$(function(){
    	const llista = $('#llista');
		const KEY = 'tasques';
		let editSpan = null;

		function guardar(){
			const tasques = llista.find('span.tasca-text').map((i, el) => $(el).text()).get();
			localStorage.setItem(KEY, JSON.stringify(tasques));
		}

		function afegir(text){
			const li = $('<li>');
			const span = $('<span>').addClass('tasca-text').text(text);
			const btns = $('<div>').addClass('btns').append(
				$('<button>').addClass('edit').text('Editar'),
				$('<button>').addClass('delete').text('Eliminar')
			);
			li.append(span, btns);
			llista.append(li);
		}

		function carregar(){
			const tasques = JSON.parse(localStorage.getItem(KEY) || '[]');
			tasques.forEach(afegir);
		}

		// Delegated event handlers (more efficient for many items)
		llista.on('click', '.btns .edit', function(){
			const li = $(this).closest('li');
			editSpan = li.find('span.tasca-text');
			$('#inputEditarTasca').val(editSpan.text());
			$('#dialogEditar').dialog('open');
		});

		llista.on('click', '.btns .delete', function(){
			const li = $(this).closest('li');
			li.fadeOut(200, function(){ li.remove(); guardar(); });
		});

		$('#dialogAfegir').dialog({
			autoOpen: false,
			modal: true,
			buttons: {
				"Afegir": function(){
					const nom = $('#inputNovaTasca').val().trim();
					if(nom){ afegir(nom); guardar(); $('#inputNovaTasca').val(''); $(this).dialog('close'); }
				},
				"Cancel·lar": function(){ $(this).dialog('close'); }
			}
		});

		$('#dialogEditar').dialog({
			autoOpen: false,
			modal: true,
			buttons: {
				"Desar": function(){
					const nom = $('#inputEditarTasca').val().trim();
					if(nom && editSpan){ editSpan.text(nom); guardar(); $(this).dialog('close'); }
				},
				"Cancel·lar": function(){ $(this).dialog('close'); }
			}
		});

		$('#btnAfegir').on('click', function(){ $('#dialogAfegir').dialog('open'); });

		carregar();
	});
})();

// Fallback: cerrar diálogos cuando se pulsa el botón .dialog-close dentro del contenido
$(document).on('click', '.dialog-close', function(){
	var content = $(this).closest('.ui-dialog-content');
	if(content.length){
		content.dialog('close');
	}
});

